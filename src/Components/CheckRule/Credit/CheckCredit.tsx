import { Credit } from "../../Credit/Credit";
import { passEvaluations, unknownEvaluations } from "../../Evaluation";
import { CreditRule, CreditLimitRule } from "../../Rule/Rule";
import { Result } from "../CheckMark";

export const CheckCreditRules = (creditRules: CreditRule[], validCredits: Credit[], isSchedule: boolean): Result => {
    return creditRules.reduce((n, creditRule) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [result, _filteredCredits, _subjectCount, _creditCount] = CheckCreditRule(creditRule, validCredits, isSchedule);
        return Math.max(n, result);
    }, Result.Pass);
}

export const CheckCreditRule = (creditRule: CreditRule, credits: Credit[], isSchedule: boolean): [Result, Credit[], number, number] => {
    if (creditRule.noSupport) {
        return [Result.Unknown, [], 0, 0];
    }
    const validCredits = credits.filter((credit) => passEvaluations.includes(credit.evaluation) || (isSchedule && unknownEvaluations.includes(credit.evaluation)))
    const filteredCredits = filterCredits(creditRule, validCredits);
    const subjectCount = filterCredits.length;
    const creditCount = filteredCredits.reduce((sum, e) => sum + e.count, 0);
    let result = Result.Unknown;
    if (creditRule.minimumCredit) {
        result = creditRule.minimumCredit <= creditCount ? Result.Pass : Result.Fail;
    } else {
        result = creditRule.minimumSubject <= subjectCount ? Result.Pass : Result.Fail;
    }
    return [result, filteredCredits, subjectCount, creditCount];
}

export const filterCredits = (creditRule: CreditRule, validCredits: Credit[]): Credit[] => {
    let filteredCredits = validCredits.filter(validCredit =>
        creditRule.includes.some((include) =>
            include.subjects ? include.subjects.includes(validCredit.name) : (include.groups.includes(validCredit.group) && include.divisions.includes(validCredit.division))
        )
    );
    return filteredCredits;
}

export const limitCredit = (limits: CreditLimitRule[], validCredits: Credit[]): Credit[] => {
    limits.forEach((limit) => {
        let targets = validCredits.filter((validCredit) => {
            return limit.subjects.includes(validCredit.name);
        });
        let countCredits = 0;
        const filteredTargets = targets.filter((target) => {
            countCredits += target.count;
            return countCredits <= limit.maximumCredit;
        });
        let noTargets = validCredits.filter((validCredit) => {
            return !limit.subjects.includes(validCredit.name);
        });
        validCredits = noTargets.concat(filteredTargets);
    });
    return validCredits;
}
