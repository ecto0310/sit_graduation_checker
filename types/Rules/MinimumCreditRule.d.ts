export type MinimumCreditRule = {
    type: "minimumCredit";
    description: string;
    targets: MinimumCreditRuleTarget[];
    minimum: number;
    requiredSubjects: string[];
}

export type MinimumCreditRuleTarget = {
    groups: string[];
    divisions: string[];
}
