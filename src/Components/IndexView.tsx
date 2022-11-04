import { useState } from 'react';
import LoadRuleView from './Rule/LoadRuleView';
import { Rules } from './Rule/Rule';
import LoadCreditView from './Credit/LoadCreditView';
import { Credits } from './Credit/Credit';

const IndexView = () => {
    const [rules, setRules] = useState<Rules>();
    const [credits, setCredits] = useState<Credits>();

    return (
        <>
            {console.log(rules)}
            {console.log(credits)}
            <div className="mt-2">
                <LoadRuleView setRules={(data: Rules) => setRules(data)} />
            </div>
            <div className="mt-2">
                <LoadCreditView setCredits={(data: Credits) => setCredits(data)} />
            </div>
        </>
    );
};


export default IndexView;
