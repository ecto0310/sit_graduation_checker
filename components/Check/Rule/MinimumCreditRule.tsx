import { useEffect } from 'react';
import { Credit } from '../../../types/credits';
import { MinimumCreditRule } from '../../../types/rules';

type MinimumCreditRuleProps = {
    rule: MinimumCreditRule;
    credits: Credit[];
}

export const CalcMinimumCreditRule = (rule: MinimumCreditRule, credits: Credit[]): [boolean, number] => {
    const targetCredits = credits.filter((credit) => rule.targets.some((target) => target.groups.includes(credit.group) && target.divisions.includes(credit.division)));
    const sumCredit = targetCredits.reduce((sum, targetCredit) => sum + targetCredit.count, 0);

    const result = rule.minimum <= sumCredit;

    return [result, sumCredit];
}

const MinimumCreditRule = ({ rule, credits }: MinimumCreditRuleProps) => {
    const [result, sumCredit] = CalcMinimumCreditRule(rule, credits);

    return (
        <>
            <tr>
                <td>{rule.description}</td>
                <td>{rule.minimum}</td>
                <td>{sumCredit}</td>
                <td>{Math.max(0, rule.minimum - sumCredit)}</td>
                <td>{result ? "OK" : "NG"}</td>
            </tr>
        </>
    )
}

export default MinimumCreditRule;
