import { useRouter } from "next/router";
import { useState } from "react";
import SelectCredit, { Credits } from "../../components/Check/SelectCredit";

const CheckPage = () => {
    const router = useRouter();

    const [credits, setCredits] = useState<Credits>();

    return (
        <>
            <div>
                <SelectCredit credits={credits || { credits: [] }} setCredits={setCredits} />
            </div>
        </>
    )
}

export default CheckPage;
