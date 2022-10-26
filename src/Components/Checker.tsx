import { useState } from 'react';
import LoadCredit, { Credits } from './LoadCredit';
import LoadRule, { Rules } from './LoadRule';

const Checker = () => {
    const [rules, setRules] = useState<Rules>();
    const [credits, setCredits] = useState<Credits>();

    return (
        <>
            <LoadRule setRules={(data: Rules) => setRules(data)} />
            <LoadCredit setCredit={(data: Credits) => setCredits(data)} />
        </>
    );
};


export default Checker;
