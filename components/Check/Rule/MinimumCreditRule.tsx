import { Credit } from '../../../interfaces/Credits';
import { Result } from '../../../interfaces/Result';
import { MinimumCreditRule } from '../../../interfaces/Rules/MinimumCreditRule';
import ResultMark from '../ResultMark';

type MinimumCreditRuleProps = {
    rule: MinimumCreditRule;
    credits: Credit[];
    passGrade: string[];
}

export const CalcMinimumCreditRule = (rule: MinimumCreditRule, credits: Credit[], passGrade: string[]): [Result, number, Credit[]] => {
    const passCredits = credits.filter((credits) => passGrade.includes(credits.grade));
    const targetCredits = passCredits.filter((credit) =>
        rule.targets.some((target) => {
            if (target.type == "group") {
                return target.groups.includes(credit.group) && target.divisions.includes(credit.division);
            } else if (target.type == "subject") {
                return target.subjects.includes(credit.name);
            }
        }
        ));
    const sumCredit = targetCredits.reduce((sum, targetCredit) => sum + targetCredit.count, 0);

    const result = rule.minimum <= sumCredit ? "pass" : "fail";

    return [result, sumCredit, targetCredits];
}

const MinimumCreditRule = ({ rule, credits, passGrade }: MinimumCreditRuleProps) => {
    const [result, sumCredit, targetCredits] = CalcMinimumCreditRule(rule, credits, passGrade);
    const nonPassrequiredSubjects = rule.requiredSubjects?.
        filter((requiredSubject) =>
            !targetCredits.some((passCredit) => passCredit.name === requiredSubject)
        )

    return (
        <>
            <tr>
                <td>{rule.description}</td>
                <td>{rule.minimum}</td>
                <td>{sumCredit}</td>
                <td>
                    {Math.max(0, rule.minimum - sumCredit)}
                    {nonPassrequiredSubjects?.
                        map((requiredSubject, index) =>
                            <ul key={index}>{requiredSubject}</ul>
                        )
                    }
                </td>
                <td><ResultMark result={result} /></td>
            </tr>
        </>
    )
}

export default MinimumCreditRule;
