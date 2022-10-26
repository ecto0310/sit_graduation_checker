
import { FC, useState } from 'react';
import { Credits } from './LoadCredit';
import { Rules } from './LoadRule';
import Form from "react-bootstrap/Form";
import CheckCreditRule from './CheckCreditRule';
import CheckGradePointAverageRule from './CheckGradePointAverageRule';
import CheckResultRule from './CheckResultRule';

type Props = {
    rules: Rules;
    credits: Credits;
}


const CheckRule: FC<Props> = ({ rules, credits }) => {
    const [isSchedule, setIsSchedule] = useState<boolean>(false);
    const [isShortage, setIsShortage] = useState<boolean>(false);
    const [isPassCredit, setIsPassCredit] = useState<boolean>(false);
    const [isPassGradePointAverage, setIsPassGradePointAverage] = useState<boolean>(false);

    return (
        <>
            <Form.Check className="m-1" type="switch" label="取得予定単位を含める" onClick={(e) => setIsSchedule(!isSchedule)} />
            <Form.Check className="m-1" type="switch" label="不足単位情報を表示する" onClick={(e) => setIsShortage(!isShortage)} />
            <CheckCreditRule rules={rules} credits={credits} isSchedule={isSchedule} isShortage={isShortage} setIsPassCredit={(ok: boolean) => setIsPassCredit(ok)} />
            <CheckGradePointAverageRule rules={rules} credits={credits} isSchedule={isSchedule} setIsPassGradePointAverage={(ok: boolean) => setIsPassGradePointAverage(ok)} />
            <CheckResultRule isPassCredit={isPassCredit} isPassGradePointAverage={isPassGradePointAverage} />
        </>
    );
};

export default CheckRule;
