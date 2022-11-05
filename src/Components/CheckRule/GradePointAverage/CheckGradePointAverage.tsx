import { Credit } from "../../Credit/Credit";
import { evaluationConverts } from "../../Evaluation";
import { Rules } from "../../Rule/Rule";
import { Result } from "../CheckMark";


export const CheckGradePointAverageRules = (rules: Rules, credits: Credit[], isSchedule: boolean): Result => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [result, gradePointAverage] = CheckGradePointAverageRule(rules.minimumGradePointAverage, credits, isSchedule);
    return result;
}


export const CheckGradePointAverageRule = (minimumGradePointAverage: number | undefined, credits: Credit[], isSchedule: boolean): [Result, number] => {
    if (!minimumGradePointAverage) {
        return [Result.Pass, 0];
    }
    if (isSchedule) {
        return [Result.Unknown, 0];
    }
    const gradePointAverage = CalcGradePointAverage(credits);
    if (minimumGradePointAverage <= gradePointAverage) {
        return [Result.Pass, gradePointAverage];
    }
    return [Result.Fail, gradePointAverage];
}

export const CalcGradePointAverage = (credits: Credit[]): number => {
    const sumGradePoint = credits.reduce((sum, e) => {
        const gradePoint = evaluationConverts.find((evaluationConvert) => { return evaluationConvert.evaluation === e.evaluation })?.gradePoint || 0;
        return sum + gradePoint * e.count;
    }, 0);
    const sumCredit = credits.reduce((sum, e) => {
        const gradePoint = evaluationConverts.find((evaluationConvert) => { return evaluationConvert.evaluation === e.evaluation })
        return sum + (gradePoint ? e.count : 0);
    }, 0);
    return sumGradePoint / sumCredit;
}
