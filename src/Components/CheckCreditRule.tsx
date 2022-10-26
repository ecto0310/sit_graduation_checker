
import { FC } from 'react';
import { Credits, Credit } from './LoadCredit';
import { Rules, CreditRule } from './LoadRule';
import Table from 'react-bootstrap/Table';

type Props = {
    rules: Rules;
    credits: Credits;
    isSchedule: boolean;
    isShortage: boolean;
    setIsPassCredit: (ok: boolean) => void;
}


const CheckCreditRule: FC<Props> = ({ rules, credits, isSchedule, isShortage, setIsPassCredit }) => {


    const countCredits = (credits: Credit[]): number => {
        const creditCount = credits.reduce((sum, e) => {
            return sum + e.count;
        }, 0);
        return creditCount;
    }

    const filterCredits = (creditRule: CreditRule, credits: Credit[]): Credit[] => {
        return credits.filter((e) => {
            return creditRule.groups.includes(e.group) && creditRule.divisions.includes(e.division) && (rules.passEvaluation.includes(e.evaluation) || (isSchedule && rules.unknownEvaluation.includes(e.evaluation)))
        });
    }

    const filterNonPassRequiredCredits = (creditRule: CreditRule, credits: Credit[]): string[] => {
        if (!creditRule.requiredCredits) {
            return [];
        }
        const creditNames = credits.map((credit) => credit.name);
        return creditRule.requiredCredits.filter((requiredCredit) => {
            return !creditNames.includes(requiredCredit);
        });
    }

    return (
        <>
            {setIsPassCredit(true)}
            <h2>単位数</h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>条件</th>
                        <th>取得単位数</th>
                        {isShortage && <th>不足単位数</th>}
                        <th>状態</th>
                    </tr>
                </thead>
                <tbody>
                    {rules.creditRules.map((creditRule) => {
                        const filteredCredits = filterCredits(creditRule, credits.credits);
                        const count = countCredits(filteredCredits);
                        const nonPassRequiredCredits = filterNonPassRequiredCredits(creditRule, filteredCredits);
                        if (count < creditRule.minimumCredit) {
                            setIsPassCredit(false)
                        }
                        return (
                            <tr>
                                <td>{creditRule.description}</td>
                                <td>{count}</td>
                                {isShortage &&
                                    <td>
                                        <>
                                            {Math.max(0, creditRule.minimumCredit - count)}
                                            {nonPassRequiredCredits.map((nonPassRequiredCredit) => <ul>{nonPassRequiredCredit}</ul>)}
                                        </>
                                    </td>
                                }
                                <td>{creditRule.minimumCredit <= count ? "OK" : "NG"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default CheckCreditRule;
