export type MinimumCreditRule = {
    type: "minimumCredit";
    description: string;
    targets: MinimumCreditRuleTarget[];
    minimum: number;
    requiredSubjects: string[];
}

export type MinimumCreditRuleTarget = MinimumCreditRuleTargetGroup | MinimumCreditRuleTargetSubject;

export type MinimumCreditRuleTargetGroup = {
    type: "group";
    groups: string[];
    divisions: string[];
}

export type MinimumCreditRuleTargetSubject = {
    type: "subject";
    subjects: string[];
}
