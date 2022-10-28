
import { FC } from 'react';
import { Credits, Credit } from './LoadCredit';
import { Rules, CreditRule } from './LoadRule';

import Table from 'react-bootstrap/Table';
import { passEvaluation, unknownEvaluation } from './Evaluation';
import CheckMark from './CheckMark';

type Props = {
    rules: Rules;
    credits: Credits;
    isSchedule: boolean;
    isShortage: boolean;
}

export const isCheckCreditRules = (rules: Rules, credits: Credits, isSchedule: boolean): boolean | undefined => {
    if (rules.creditRules.some(creditRule => creditRule.noSupport)) {
        return undefined;
    }

    return rules.creditRules.every(creditRule => {
        return isCheckCreditRule(creditRule, credits.credits, isSchedule);
    });
}

const isCheckCreditRule = (creditRule: CreditRule, credits: Credit[], isSchedule: boolean): boolean | undefined => {
    if (creditRule.noSupport) {
        return undefined;
    }
    const filteredCredits = filterCredits(credits, creditRule, isSchedule);
    const isCheckCredit = (creditRule.minimumCredit !== undefined);
    const creditCount = filteredCredits.reduce((sum, e) => sum + e.count, 0);
    const subjectCount = filteredCredits.length;
    return (creditRule.noSupport ? undefined : isCheckCredit ? creditRule.minimumCredit <= creditCount : creditRule.minimumSubject <= subjectCount);
}

const filterCredits = (credits: Credit[], creditRule: CreditRule, isSchedule: boolean): Credit[] => {
    let filteredCredits = credits.filter(credit => unknownEvaluation.includes(credit.evaluation) ? isSchedule : passEvaluation.includes(credit.evaluation)
    ).filter(credit =>
        creditRule.includes.some((include) =>
            include.subjects ? include.subjects.includes(credit.name) : include.groups.includes(credit.group) && include.divisions.includes(credit.division)
        )
    );
    creditRule.limits && creditRule.limits.forEach(limit => {
        let targets = filteredCredits.filter((filteredCredit) => {
            return limit.subjects.includes(filteredCredit.name);
        });
        let countCredits = 0;
        const filteredTargets = targets.filter((target) => {
            countCredits += target.count;
            return countCredits <= limit.maximumCredit;
        });
        const nonTarget = filteredCredits.filter((filteredCredit) => {
            return !limit.subjects.includes(filteredCredit.name);
        });
        filteredCredits = nonTarget.concat(filteredTargets);
    });
    return filteredCredits;
}

export const globalFilter = (credits: Credits, rules: Rules): Credits => {
    let filteredCredits = credits.credits
    rules.limits && rules.limits.forEach(limit => {
        let targets = filteredCredits.filter((filteredCredit) => {
            return limit.subjects.includes(filteredCredit.name);
        });
        let countCredits = 0;
        const filteredTargets = targets.filter((target) => {
            countCredits += target.count;
            return countCredits <= limit.maximumCredit;
        });
        const nonTarget = filteredCredits.filter((filteredCredit) => {
            return !limit.subjects.includes(filteredCredit.name);
        });
        filteredCredits = nonTarget.concat(filteredTargets);
    });
    credits.credits = filteredCredits
    return credits;
}

const CheckCreditRule: FC<Props> = ({ rules, credits, isSchedule, isShortage }) => {
    const filterNonPassRequiredCredits = (creditRule: CreditRule, filteredCredits: Credit[]): string[] => {
        return creditRule.requiredCredits ?
            creditRule.requiredCredits.filter(requiredCredit =>
                !filteredCredits.some(filteredCredit =>
                    filteredCredit.name === requiredCredit
                )
            ) :
            []
    };

    return (
        <>
            <h2>単位数 <CheckMark result={isCheckCreditRules(rules, credits, isSchedule)} /></h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>条件</th>
                        <th>取得単位数/科目数</th>
                        {isShortage && <th>不足単位数/科目数</th>}
                        <th>状態</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rules.creditRules.map((creditRule) => {
                            const filteredCredits = filterCredits(credits.credits, creditRule, isSchedule);
                            const isCheckCredit = (creditRule.minimumCredit !== undefined);
                            const creditCount = filteredCredits.reduce((sum, e) => sum + e.count, 0);
                            const subjectCount = filteredCredits.length;
                            const result = isCheckCreditRule(creditRule, credits.credits, isSchedule);
                            return (
                                <tr>
                                    <td>{creditRule.description}</td>
                                    {isCheckCredit ?
                                        <>
                                            <td>{creditCount}</td>
                                            {isShortage &&
                                                <td>
                                                    <>
                                                        {Math.max(0, creditRule.minimumCredit - creditCount)}
                                                        {
                                                            result !== true &&
                                                            filterNonPassRequiredCredits(creditRule, filteredCredits)?.map((nonPassRequiredCredit) => {
                                                                return (<ul>{nonPassRequiredCredit}</ul>);
                                                            })
                                                        }
                                                    </>
                                                </td>
                                            }
                                        </> :
                                        <>
                                            <td>{subjectCount}</td>
                                            {isShortage &&
                                                <td>
                                                    <>
                                                        {Math.max(0, creditRule.minimumSubject - subjectCount)}
                                                        {
                                                            result !== true &&
                                                            filterNonPassRequiredCredits(creditRule, filteredCredits)?.map((nonPassRequiredCredit) => {
                                                                return (<ul>{nonPassRequiredCredit}</ul>);
                                                            })
                                                        }
                                                    </>
                                                </td>
                                            }
                                        </>
                                    }
                                    <td><CheckMark result={result} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    );
};

export default CheckCreditRule;
