import { FC } from 'react';
import { Credit } from '../../Credit/Credit';
import { Rules } from '../../Rule/Rule';
import CheckMark from '../CheckMark';
import { CheckGradePointAverageRules } from './CheckGradePointAverage';
import CheckGradePointAverageTableView from './CheckGradePointAverageTableView';

type Props = {
    rules: Rules;
    credits: Credit[];
    isSchedule: boolean;
}

const CheckGradePointAverageView: FC<Props> = ({ rules, credits, isSchedule }) => {

    return (
        <>
            <h2>GPA <CheckMark result={CheckGradePointAverageRules(rules, credits, isSchedule)} /></h2>
            {
                !rules.minimumGradePointAverage ?
                    "GPAに関する条件はありません" :
                    isSchedule ?
                        "取得予定の単位を含む場合判定はスキップされます" :
                        <CheckGradePointAverageTableView rules={rules} credits={credits} isSchedule={isSchedule} />
            }
        </>
    );
};

export default CheckGradePointAverageView;
