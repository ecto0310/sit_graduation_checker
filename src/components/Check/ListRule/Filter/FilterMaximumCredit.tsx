import { Credit } from "../../../../interfaces/Credits";
import { MaximumCreditFilter } from "../../../../interfaces/Rules/MaximumCreditFilter";

export const FilterMaximumCredit = (
  credits: Credit[],
  filter: MaximumCreditFilter,
): Credit[] => {
  const targets = credits.filter((credit) =>
    filter.targets.some((target) => {
      let ret = false;
      if (target.type == "group") {
        ret =
          target.groups.includes(credit.group) &&
          target.divisions.includes(credit.division);
      } else if (target.type == "subject") {
        ret = target.subjects.includes(credit.name);
      }
      return ret;
    }),
  );
  let limitCredit = filter.maximum;
  const filteredTargets = targets.filter((target) => {
    limitCredit -= target.count;
    return 0 <= limitCredit;
  });
  const nonTargets = credits.filter((credit) =>
    filter.targets.some((target) => {
      let ret = false;
      if (target.type == "group") {
        ret =
          target.groups.includes(credit.group) &&
          target.divisions.includes(credit.division);
      } else if (target.type == "subject") {
        ret = target.subjects.includes(credit.name);
      }
      return !ret;
    }),
  );
  return nonTargets.concat(filteredTargets);
};
