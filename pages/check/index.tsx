import { useRouter } from "next/router";
import { useState } from "react";
import ListCredit from "../../components/Check/ListCredit";
import SelectCredit, { Credits } from "../../components/Check/SelectCredit";

const CheckPage = () => {
    const router = useRouter();

    const [credits, setCredits] = useState<Credits>({ credits: [] });

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
