export type Rules = {
    title: string;
    creditRules: CreditRule[];
    limits: CreditLimitRule[];
    minimumGradePointAverage: number;
}

export type CreditRule = {
    noSupport: boolean;
    description: string;
    includes: CreditIncludeRule[];
    limits: CreditLimitRule[];
    minimumCredit: number;
    minimumSubject: number;
    requiredCredits: string[];
}

export type CreditIncludeRule = {
    groups: string[];
    divisions: string[];
    subjects: string[];
}

export type CreditLimitRule = {
    subjects: string[];
    maximumCredit: number;
}
