import { FC } from 'react';
import { Credit } from '../Credit/Credit';
import { Rules } from '../Rule/Rule';
import CheckMark from './CheckMark';
import CheckCreditTableView from './CheckCreditTableView';
import { CheckCreditRules } from './CheckCredit';

type Props = {
    rules: Rules;
    credits: Credit[];
    isSchedule: boolean;
    isShortage: boolean;
}

const CheckCreditView: FC<Props> = ({ rules, credits, isSchedule, isShortage }) => {
    return (
        <>
            <h2>単位数 <CheckMark result={CheckCreditRules(rules.creditRules,credits,isSchedule)} /></h2>
            <CheckCreditTableView creditRules={rules.creditRules} credits={credits} isSchedule={isSchedule} isShortage={isShortage} />
        </>
    );
};

export default CheckCreditView;
