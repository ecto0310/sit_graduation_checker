
import { FC } from 'react';
import { Credits } from './LoadCredit';
import { Rules } from './LoadRule';
import Table from 'react-bootstrap/Table';

type Props = {
    rules: Rules;
    credits: Credits;
    isSchedule: boolean;
    setIsPassGradePointAverage: (ok: boolean) => void;
}

export const isCheckGradePointAverage = (rules: Rules, credits: Credits, isSchedule: boolean): boolean => {
    return true;
}


const CheckGradePointAverageRule: FC<Props> = ({ rules, credits, isSchedule, setIsPassGradePointAverage }) => {
    const calcGradePointAverage = (): number => {
        const sumGradePoint = credits.credits.reduce((sum, e) => {
            const gradePoint = rules.gradePointAverageRule.evaluationConverts.find((evaluationConvert) => { return evaluationConvert.evaluation === e.evaluation })?.gradePoint || 0;
            return sum + gradePoint * e.count;
        }, 0);
        const sumCredit = credits.credits.reduce((sum, e) => {
            const gradePoint = rules.gradePointAverageRule.evaluationConverts.find((evaluationConvert) => { return evaluationConvert.evaluation === e.evaluation })
            return sum + (gradePoint ? e.count : 0);
        }, 0);
        return sumGradePoint / sumCredit;
    }

    return (
        <>
            {setIsPassGradePointAverage(isSchedule || rules.gradePointAverageRule.minimumGradePointAverage <= calcGradePointAverage())}
            <h2>GPA</h2>
            {isSchedule ?
                "取得予定の単位を含む場合判定はスキップされます" :
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>条件</th>
                            <th>GPA</th>
                            <th>状態</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{rules.gradePointAverageRule.minimumGradePointAverage}以上</td>
                            <td>{calcGradePointAverage()}</td>
                            <td>{rules.gradePointAverageRule.minimumGradePointAverage <= calcGradePointAverage() ? "OK" : "NG"}</td>
                        </tr>
                    </tbody>
                </Table>
            }
        </>
    );
};

export default CheckGradePointAverageRule;
