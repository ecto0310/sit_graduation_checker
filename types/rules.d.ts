export type PresetRuleFiles = {
    years: Year[];
}

export type Year = {
    name: string;
    departments: Department[];
}

export type Department = {
    name: string;
    ruleFiles: RuleFile[];
}

export type RuleFile = {
    name: string;
    file: string;
}

export type Rules = {
    title: string;
    creditInfo: CreditInfo;
    rules: Rule[];
}

export type CreditInfo = {
    groups: string[];
    divisions: string[];
    gradePoint: gradePoint[];
    passGrade: string[];
    failGrade: string[];
    unknownGrade: string[];
}

export type gradePoint = {
    grade: string;
    point: number;
}

export type Rule = MinimumCreditRule;

export type MinimumCreditRule = {
    type: string;
    description: string;
    targets: MinimumCreditRuleTarget[];
    minimumCount: number;
}

export type MinimumCreditRuleTarget = {
    groups: string[];
    divisions: string[];
}
