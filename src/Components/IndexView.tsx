import { useState } from 'react';
import LoadRuleView from './Rule/LoadRuleView';
import { Rules } from './Rule/Rule';
import LoadCreditView from './Credit/LoadCreditView';
import { Credits } from './Credit/Credit';
import MainView from './MainView';

const IndexView = () => {
    const [rules, setRules] = useState<Rules>();
    const [credits, setCredits] = useState<Credits>();

    return (
        <>
            <div className="mt-2">
                <LoadRuleView setRules={(data: Rules) => setRules(data)} />
            </div>
            <div className="mt-2">
                <LoadCreditView setCredits={(data: Credits) => setCredits(data)} />
            </div>
            <div className="mt-2">
                <MainView rules={rules} credits={credits} setCredits={(data: Credits) => setCredits(data)}/>
            </div>
        </>
    );
};


export default IndexView;
