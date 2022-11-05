import { FC, useState } from 'react';
import { Credits } from '../Credit/Credit';
import { Rules } from '../Rule/Rule';
import Form from "react-bootstrap/Form";
import CheckCreditView from './CheckCreditView';
import { CheckCreditRules, limitCredit } from './CheckCredit';
import CheckGradePointAverageView from './CheckGradePointAverageView';
import CheckResultView from './CheckResultView';
import { CheckGradePointAverageRules } from './CheckGradePointAverage';

type Props = {
    rules: Rules;
    credits: Credits;
}

const CheckRuleView: FC<Props> = ({ rules, credits }) => {
    const [isSchedule, setIsSchedule] = useState<boolean>(false);
    const [isShortage, setIsShortage] = useState<boolean>(false);

    return (
        <>
            <Form.Check className="m-1" type="switch" label="取得予定単位を含める" onClick={(e) => setIsSchedule(!isSchedule)} />
            <Form.Check className="m-1" type="switch" label="不足単位情報を表示する" onClick={(e) => setIsShortage(!isShortage)} />
            <CheckCreditView rules={rules} credits={limitCredit(rules.limits || [], credits.credits)} isSchedule={isSchedule} isShortage={isShortage} />
            <CheckGradePointAverageView rules={rules} credits={limitCredit(rules.limits || [], credits.credits)} isSchedule={isSchedule} />
            <CheckResultView creditResult={CheckCreditRules(rules.creditRules, credits.credits, isSchedule)} gradePointAverageResult={CheckGradePointAverageRules(rules, credits.credits, isSchedule)} />
        </>
    );
};

export default CheckRuleView;
