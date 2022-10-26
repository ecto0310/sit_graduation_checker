import { useState } from 'react';
import LoadRule, { Rules } from './LoadRule';

const Checker = () => {
    const [rules, setRules] = useState<Rules>();

    return (
        <>
            <LoadRule setRules={(data: Rules) => setRules(data)} />
        </>
    );
};


export default Checker;
