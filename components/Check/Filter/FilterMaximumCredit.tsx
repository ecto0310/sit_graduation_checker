import { Credit } from "../../../types/Credits";
import { MaximumCreditFilter } from "../../../types/Rules/MaximumCreditFilter";

export const FilterMaximumCredit = (credits: Credit[], filter: MaximumCreditFilter): Credit[] => {
    const targets = credits.filter((credit) => filter.targets.some((target) => target.subjects.includes(credit.name)));
    let limitCredit = filter.maximum;
    const filteredTargets = targets.filter((target) => {
        limitCredit -= target.count;
        return 0 <= limitCredit;
    });
    const nonTargets = credits.filter((credit) => !filter.targets.some((target) => target.subjects.includes(credit.name)));
    return nonTargets.concat(filteredTargets)
}
