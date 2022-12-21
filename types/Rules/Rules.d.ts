import { MinimumCreditRule } from './MinimumCreditRule';
import { MinimumGPARule } from './MinimumGPARule';
import { MaximumCreditFilter } from './MaximumCreditFilter';

export type Rules = {
    title: string;
    creditInfo: CreditInfo;
    rules: Rule[];
    filters: Filter[];
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

export type Filter = MaximumCreditFilter;
