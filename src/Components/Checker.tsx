import { useState } from 'react';
import LoadCredit, { Credits } from './LoadCredit';
import LoadRule, { Rules } from './LoadRule';
import CheckMenu from './CheckMenu';

const Checker = () => {
    const [rules, setRules] = useState<Rules>();
    const [credits, setCredits] = useState<Credits>();

    return (
        <>
            <div className="mt-2">
                <LoadRule setRules={(data: Rules) => setRules(data)} />
            </div>
            <div className="mt-2">
                <LoadCredit setCredit={(data: Credits) => setCredits(data)} />
            </div>
            <div className="mt-2">
                <CheckMenu rules={rules} credits={credits} setCredit={(data: Credits) => setCredits(data)} />
            </div>
        </>
    );
};


export default Checker;
