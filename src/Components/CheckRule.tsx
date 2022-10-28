
import { FC, useState } from 'react';
import { Credits } from './LoadCredit';
import { Rules } from './LoadRule';
import Form from "react-bootstrap/Form";
import CheckCreditRule, { isCheckCreditRules, globalFilter } from './CheckCreditRule';
import CheckGradePointAverageRule, { isCheckGradePointAverage } from './CheckGradePointAverageRule';
import CheckResultRule from './CheckResultRule';

type Props = {
    rules: Rules;
    credits: Credits;
}

const CheckRule: FC<Props> = ({ rules, credits }) => {
    const [isSchedule, setIsSchedule] = useState<boolean>(false);
    const [isShortage, setIsShortage] = useState<boolean>(false);

    return (
        <>
            <Form.Check className="m-1" type="switch" label="取得予定単位を含める" onClick={(e) => setIsSchedule(!isSchedule)} />
            <Form.Check className="m-1" type="switch" label="不足単位情報を表示する" onClick={(e) => setIsShortage(!isShortage)} />
            <CheckCreditRule rules={rules} credits={credits} isSchedule={isSchedule} isShortage={isShortage} />
            <CheckGradePointAverageRule rules={rules} credits={globalFilter(credits, rules)} isSchedule={isSchedule} />
            <CheckResultRule isPassCredit={isCheckCreditRules(rules, globalFilter(credits, rules), isSchedule)} isPassGradePointAverage={isCheckGradePointAverage(rules, credits, isSchedule)} />
        </>
    );
};

export default CheckRule;
