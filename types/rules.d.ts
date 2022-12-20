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
    gradePoint: GradePoint[];
    passGrade: string[];
    failGrade: string[];
    unknownGrade: string[];
}

export type GradePoint = {
    grade: string;
    point: number;
}

export type Rule = MinimumCreditRule | MinimumGPARule;

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

export type MinimumGPARule = {
    type: "minimumGPA";
    description: string;
    minimum: number;
}
