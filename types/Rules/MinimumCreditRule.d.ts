export type MinimumCreditRule = {
    type: "minimumCredit";
    description: string;
    targets: MinimumCreditRuleTarget[];
    minimum: number;
}

export type MinimumCreditRuleTarget = {
    groups: string[];
    divisions: string[];
}
