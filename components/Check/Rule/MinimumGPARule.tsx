import { Credit } from '../../../interfaces/Credits';
import { GradePoint } from '../../../interfaces/Rules/Rules';
import { MinimumGPARule } from '../../../interfaces/Rules/MinimumGPARule';
import ResultMark from '../ResultMark';
import { Result } from '../../../interfaces/Result';

type MinimumGPARuleProps = {
    rule: MinimumGPARule;
    credits: Credit[];
    gradePoint: GradePoint[];
    isSchedule: boolean;
}

export const CalcMinimumGPARule = (rule: MinimumGPARule, credits: Credit[], gradePoint: GradePoint[], isSchedule: boolean): [Result, number] => {
    const includeCredits = credits.filter((credit) => gradePoint.find((gradePoint) => gradePoint.grade == credit.grade) !== undefined);
    const creditCount = includeCredits.reduce((sum, credit) => sum + credit.count, 0);
    const sumGP = includeCredits.reduce((sum, credit) => sum + gradePoint.find((gradePoint) => gradePoint.grade == credit.grade)!.point * credit.count, 0);
    const GPA = Math.round(sumGP / creditCount * 10) / 10;
    const result = isSchedule ? "unknown" : (rule.minimum <= GPA ? "pass" : "fail");

    return [result, GPA];
}

const MinimumGPARule = ({ rule, credits, gradePoint, isSchedule }: MinimumGPARuleProps) => {
    const [result, GPA] = CalcMinimumGPARule(rule, credits, gradePoint, isSchedule);

    return (
        <>
            <tr>
                <td>{rule.description}</td>
                <td>{rule.minimum}</td>
                <td>{GPA}</td>
                <td>{Math.max(0, rule.minimum - GPA)}</td>
                <td><ResultMark result={result} /></td>
            </tr>
        </>
    )
}

export default MinimumGPARule;
