import { FC } from 'react';
import { Credit } from '../Credit/Credit';
import { Rules } from '../Rule/Rule';
import CheckMark from './CheckMark';
import CheckCreditTableView from './CheckCreditTableView';
import { passEvaluations, unknownEvaluations } from '../Evaluation';
import { CheckCreditRules } from './CheckCredit';

type Props = {
    rules: Rules;
    credits: Credit[];
    isSchedule: boolean;
    isShortage: boolean;
}

const CheckCreditView: FC<Props> = ({ rules, credits, isSchedule, isShortage }) => {
    const validCredits = credits.filter((credit) => passEvaluations.includes(credit.evaluation) || (isSchedule && unknownEvaluations.includes(credit.evaluation)))

    return (
        <>
            <h2>単位数 <CheckMark result={CheckCreditRules(rules.creditRules,validCredits)} /></h2>
            <CheckCreditTableView creditRules={rules.creditRules} validCredits={validCredits} isShortage={isShortage} />
        </>
    );
};

export default CheckCreditView;
