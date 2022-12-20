import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListCredit from "../../components/Check/ListCredit";
import SelectCredit, { Credits } from "../../components/Check/SelectCredit";
import { Rules } from "../../types/rules";

const CheckPage = () => {
    const router = useRouter();

    const [credits, setCredits] = useState<Credits>({ credits: [] });
    const [rule, setRule] = useState<Rules>();

    useEffect(() => {
        if (router.query.ruleFile !== undefined && rule === undefined) {
            fetch("/rules/" + router.query.ruleFile)
                .then(response => response.json())
                .then(data => { setRule(data) });
        }
    });

    return (
        <>
            <div>
                <SelectCredit credits={credits} setCredits={setCredits} />
            </div>
            <div>
                <ListCredit credits={credits} />
            </div>
        </>
    )
}

export default CheckPage;
