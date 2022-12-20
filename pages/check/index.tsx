import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListCredit from "../../components/Check/ListCredit";
import ListRule from "../../components/Check/ListRule";
import SelectCredit, { Credits } from "../../components/Check/SelectCredit";
import { Rules } from "../../types/rules";

const CheckPage = () => {
    const router = useRouter();

    const [credits, setCredits] = useState<Credits>();
    const [rules, setRules] = useState<Rules>();

    useEffect(() => {
        if (router.query.ruleFile !== undefined && rules === undefined) {
            fetch("/rules/" + router.query.ruleFile)
                .then(response => response.json())
                .then(data => { setRules(data) });
        }
    });

    return (
        <>
            <div>
                <SelectCredit credits={credits} setCredits={setCredits} />
            </div>
            <div>
                {
                    rules &&
                    <ListRule credits={credits || { credits: [] }} rules={rules} />
                }
                <ListCredit credits={credits || { credits: [] }} />
            </div>
        </>
    )
}

export default CheckPage;
