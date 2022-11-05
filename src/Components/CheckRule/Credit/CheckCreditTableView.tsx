import { FC } from 'react';
import { Credit } from '../../Credit/Credit';
import { CreditRule } from '../../Rule/Rule';
import CheckMark, { Result } from '../CheckMark';
import { CheckCreditRule } from './CheckCredit';
import Table from 'react-bootstrap/Table';

type Props = {
    creditRules: CreditRule[];
    credits: Credit[];
    isSchedule: boolean;
    isShortage: boolean;
}

const CheckCreditTableView: FC<Props> = ({ creditRules, credits, isSchedule, isShortage }) => {
    const tableRows = (creditRule: CreditRule, result: Result, filteredCredits: Credit[], subjectCount: number, creditCount: number): JSX.Element => {
        let requiredCredits = (
            <>
                {
                    (creditRule.requiredCredits || []).filter((requiredCredit) =>
                        !filteredCredits.some(filteredCredit =>
                            filteredCredit.name === requiredCredit)
                    ).map((nonPassRequiredCredit) =>
                        (<ul>{nonPassRequiredCredit}</ul>))
                }
            </>
        );
        let detail = (
            <>
                <td>{creditCount}単位</td>
                {isShortage &&
                    <td>
                        <>
                            {Math.max(0, creditRule.minimumCredit - creditCount)}単位
                            {requiredCredits}
                        </>
                    </td>
                }
            </>
        );
        if (!creditRule.minimumCredit) {
            detail = (
                <>
                    <td>{subjectCount}科目</td>
                    {isShortage &&
                        <td>
                            <>
                                {Math.max(0, creditRule.minimumSubject - subjectCount)}単位
                                {requiredCredits}
                            </>
                        </td>
                    }
                </>
            );
        }
        return (
            <tr>
                <td>{creditRule.description}</td>
                {detail}
                <td><CheckMark result={result} /></td>
            </tr>
        );
    }

    return (
        <>
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
                        creditRules.map((creditRule) => {
                            const [result, filteredCredits, subjectCount, creditCount] = CheckCreditRule(creditRule, credits, isSchedule);
                            return (tableRows(creditRule, result, filteredCredits, subjectCount, creditCount));
                        })
                    }
                </tbody>
            </Table>
        </>
    );
};

export default CheckCreditTableView;
