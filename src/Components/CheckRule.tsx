
import { FC, useState } from 'react';
import { Credits, Credit } from './LoadCredit';
import { Rules, CreditRule } from './LoadRule';
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';

type Props = {
    rules: Rules;
    credits: Credits;
}


const CheckRule: FC<Props> = ({ rules, credits }) => {
    const [isSchedule, setIsSchedule] = useState<boolean>(false);
    const [isShortage, setIsShortage] = useState<boolean>(false);


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
            <Form.Check type="switch" label="取得予定単位を含める" onClick={(e) => setIsSchedule(!isSchedule)} />
            <Form.Check type="switch" label="不足単位情報を表示する" onClick={(e) => setIsShortage(!isShortage)} />
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
                        console.log(creditRule);
                        const filteredCredits = filterCredits(creditRule, credits.credits);
                        const count = countCredits(filteredCredits);
                        const nonPassRequiredCredits = filterNonPassRequiredCredits(creditRule, filteredCredits);
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
                                <td>{creditRule.minimumCredit <= count ? 'OK' : "NG"}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default CheckRule;
