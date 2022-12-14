import { Credit } from '../../../types/Credits';
import { GradePoint } from '../../../types/Rules/Rules';
import { MinimumGPARule } from '../../../types/Rules/MinimumGPARule';
import ResultMark from '../ResultMark';
import { Result } from '../../../types/Result';

type MinimumGPARuleProps = {
    rule: MinimumGPARule;
    credits: Credit[];
    gradePoint: GradePoint[];
}

export const CalcMinimumGPARule = (rule: MinimumGPARule, credits: Credit[], gradePoint: GradePoint[]): [Result, number] => {
    const includeCredits = credits.filter((credit) => gradePoint.find((gradePoint) => gradePoint.grade == credit.grade) !== undefined);
    const creditCount = includeCredits.reduce((sum, credit) => sum + credit.count, 0);
    const sumGP = includeCredits.reduce((sum, credit) => sum + gradePoint.find((gradePoint) => gradePoint.grade == credit.grade)!.point * credit.count, 0);
    const GPA = Math.round(sumGP / creditCount * 10) / 10;
    const result = rule.minimum <= GPA ? "pass" : "fail";

    return [result, GPA];
}

const MinimumGPARule = ({ rule, credits, gradePoint }: MinimumGPARuleProps) => {
    const [result, GPA] = CalcMinimumGPARule(rule, credits, gradePoint);

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
