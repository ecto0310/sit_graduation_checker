
import { FC, useState } from 'react';
import { Credits } from '../Credit/Credit';
import { Rules } from '../Rule/Rule';
import Form from "react-bootstrap/Form";

type Props = {
    rules: Rules;
    credits: Credits;
}

const CheckRuleView: FC<Props> = ({ rules, credits }) => {
    const [isSchedule, setIsSchedule] = useState<boolean>(false);
    const [isShortage, setIsShortage] = useState<boolean>(false);

    return (
        <>
            {console.log(rules)}
            {console.log(credits)}
            <Form.Check className="m-1" type="switch" label="取得予定単位を含める" onClick={(e) => setIsSchedule(!isSchedule)} />
            <Form.Check className="m-1" type="switch" label="不足単位情報を表示する" onClick={(e) => setIsShortage(!isShortage)} />
        </>
    );
};

export default CheckRuleView;
