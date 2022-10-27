
import { FC } from 'react';
import { Credits } from './LoadCredit';
import { Rules } from './LoadRule';
import Table from 'react-bootstrap/Table';
import { evaluationConverts } from './Evaluation';

type Props = {
    rules: Rules;
    credits: Credits;
    isSchedule: boolean;
}

export const isCheckGradePointAverage = (rules: Rules, credits: Credits, isSchedule: boolean): boolean | undefined => {
    return (rules.minimumGradePointAverage === undefined ? true : isSchedule ? undefined : rules.minimumGradePointAverage < calcGradePointAverage(credits));
}

const calcGradePointAverage = (credits: Credits): number => {
    const sumGradePoint = credits.credits.reduce((sum, e) => {
        const gradePoint = evaluationConverts.find((evaluationConvert) => { return evaluationConvert.evaluation === e.evaluation })?.gradePoint || 0;
        return sum + gradePoint * e.count;
    }, 0);
    const sumCredit = credits.credits.reduce((sum, e) => {
        const gradePoint = evaluationConverts.find((evaluationConvert) => { return evaluationConvert.evaluation === e.evaluation })
        return sum + (gradePoint ? e.count : 0);
    }, 0);
    return sumGradePoint / sumCredit;
}


const CheckGradePointAverageRule: FC<Props> = ({ rules, credits, isSchedule }) => {
    const resultView = (result: boolean | undefined): string => {
        return (result === undefined ? "unknown" : result ? "OK" : "NG");
    }


    return (
        <>
            <h2>GPA {resultView(isCheckGradePointAverage(rules, credits, isSchedule))}</h2>
            {rules.minimumGradePointAverage === undefined ?
                "GPAに関する条件はありません" :
                isSchedule ?
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
                                <td>{rules.minimumGradePointAverage}以上</td>
                                <td>{calcGradePointAverage(credits)}</td>
                                <td>{rules.minimumGradePointAverage <= calcGradePointAverage(credits) ? "OK" : "NG"}</td>
                            </tr>
                        </tbody>
                    </Table>
            }
        </>
    );
};

export default CheckGradePointAverageRule;
