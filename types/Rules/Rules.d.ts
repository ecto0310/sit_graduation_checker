import { MinimumCreditRule } from './MinimumCreditRule';
import { MinimumGPARule } from './MinimumGPARule';

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
