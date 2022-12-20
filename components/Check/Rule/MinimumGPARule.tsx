import { useEffect } from 'react';
import { Credit } from '../../../types/credits';
import { GradePoint, MinimumGPARule } from '../../../types/rules';

type MinimumGPARuleProps = {
    rule: MinimumGPARule;
    gradePoint: GradePoint[];
    credits: Credit[];
}

export const CalcMinimumGPARule = (rule: MinimumGPARule, gradePoint: GradePoint[], credits: Credit[]): [boolean, number] => {
    const includeCredits = credits.filter((credit) => gradePoint.find((gradePoint) => gradePoint.grade == credit.grade) !== undefined);
    const creditCount = includeCredits.reduce((sum, credit) => sum + credit.count, 0);
    const sumGP = includeCredits.reduce((sum, credit) => sum + gradePoint.find((gradePoint) => gradePoint.grade == credit.grade)!.point * credit.count, 0);
    const GPA = Math.round(sumGP / creditCount * 10) / 10;
    const result = rule.minimum <= GPA;

    return [result, GPA];
}

const MinimumGPARule = ({ rule, gradePoint, credits }: MinimumGPARuleProps) => {
    const [result, GPA] = CalcMinimumGPARule(rule, gradePoint, credits);

    return (
        <>
            <tr>
                <td>{rule.description}</td>
                <td>{rule.minimum}</td>
                <td>{GPA}</td>
                <td>{Math.max(0, rule.minimum - GPA)}</td>
                <td>{result ? "OK" : "NG"}</td>
            </tr>
        </>
    )
}

export default MinimumGPARule;
