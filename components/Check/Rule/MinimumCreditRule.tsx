import { Credit } from '../../../types/credits';
import { MinimumCreditRule } from '../../../types/rules';

type MinimumCreditRuleProps = {
    rule: MinimumCreditRule;
    credits: Credit[];
}

const MinimumCreditRule = ({ rule, credits }: MinimumCreditRuleProps) => {
    const targetCredits = credits.filter((credit) => rule.targets.some((target) => target.groups.includes(credit.group) && target.divisions.includes(credit.division)));
    const sumCredit = targetCredits.reduce((sum, targetCredit) => sum + targetCredit.count, 0);

    return (
        <>
            <tr>
                <td>{rule.description}</td>
                <td>{rule.minimumCount}</td>
                <td>{sumCredit}</td>
                <td>{Math.max(0, rule.minimumCount - sumCredit)}</td>
                <td>OK</td>
            </tr>
        </>
    )
}

export default MinimumCreditRule;
