import { useEffect } from 'react';
import { Credit } from '../../../types/Credits';
import { MinimumCreditRule } from '../../../types/Rules/MinimumCreditRule';

type MinimumCreditRuleProps = {
    rule: MinimumCreditRule;
    credits: Credit[];
    passGrade: string[];
}

export const CalcMinimumCreditRule = (rule: MinimumCreditRule, credits: Credit[], passGrade: string[]): [boolean, number, Credit[]] => {
    const passCredits = credits.filter((credits) => passGrade.includes(credits.grade));
    const targetCredits = passCredits.filter((credit) => rule.targets.some((target) => target.groups.includes(credit.group) && target.divisions.includes(credit.division)));
    const sumCredit = targetCredits.reduce((sum, targetCredit) => sum + targetCredit.count, 0);

    const result = rule.minimum <= sumCredit;

    return [result, sumCredit, passCredits];
}

const MinimumCreditRule = ({ rule, credits, passGrade }: MinimumCreditRuleProps) => {
    const [result, sumCredit, passCredits] = CalcMinimumCreditRule(rule, credits, passGrade);
    const nonPassrequiredSubjects = rule.requiredSubjects?.
        filter((requiredSubject) =>
            !passCredits.some((passCredit) => passCredit.name === requiredSubject)
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
                        map((requiredSubject) =>
                            <ul>{requiredSubject}</ul>
                        )
                    }
                </td>
                <td>{result ? "OK" : "NG"}</td>
            </tr>
        </>
    )
}

export default MinimumCreditRule;
