import { Credit } from '../../../types/credits';
import { GradePoint, MinimumGPARule } from '../../../types/rules';

type MinimumGPARuleProps = {
    rule: MinimumGPARule;
    gradePoint: GradePoint[]
    credits: Credit[];
}

const MinimumGPARule = ({ rule, gradePoint, credits }: MinimumGPARuleProps) => {
    const includeCredits = credits.filter((credit) => gradePoint.find((gradePoint) => gradePoint.grade == credit.grade) !== undefined);
    const creditCount = includeCredits.reduce((sum, credit) => sum + credit.count, 0);
    const sumGP = includeCredits.reduce((sum, credit) => sum + gradePoint.find((gradePoint) => gradePoint.grade == credit.grade)!.point * credit.count, 0);
    const GPA = Math.round(sumGP / creditCount * 10) / 10;

    return (
        <>
            <tr>
                <td>{rule.description}</td>
                <td>{rule.minimum}</td>
                <td>{GPA}</td>
                <td>{Math.max(0, rule.minimum - GPA)}</td>
                <td>OK</td>
            </tr>
        </>
    )
}

export default MinimumGPARule;
