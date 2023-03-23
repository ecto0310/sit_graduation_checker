import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Nav } from 'react-bootstrap'
import ListCredit from "../components/Check/ListCredit/ListCredit";
import ListRule from "../components/Check/ListRule/ListRule";
import MainTab from "../components/Check/MainTab";
import SelectCredit from "../components/Check/SelectCredit";
import { Credits } from "../interfaces/Credits";
import { Rules } from "../interfaces/Rules/Rules";

const CheckPage = () => {
    const router = useRouter();

    const [credits, setCredits] = useState<Credits>();
    const [rules, setRules] = useState<Rules>();
    const [mode, setMode] = useState<string>("check");

    useEffect(() => {
        if (router.query.ruleFile !== undefined && rules === undefined) {
            fetch("/rules/" + router.query.ruleFile)
                .then(response => response.json())
                .then(data => { setRules(data) });
        }
    });

    const saveCredits = (credits: Credits) => {
        sessionStorage.setItem("credit", JSON.stringify(credits));
        setCredits(credits);
    }

    return (
        <>
            <div className="h3">
                判定項目: {rules?.title || "読み込み中"}
            </div>
            <div>
                <SelectCredit credits={credits} setCredits={saveCredits} />
            </div>
            <div>
                <Nav fill variant="tabs" className="mb-2">
                    <Nav.Item >
                        <Nav.Link disabled={rules === undefined} active={mode === "check"} onClick={(e) => setMode("check")} >要件チェック</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                        <Nav.Link disabled={credits === undefined} active={mode === "credit"} onClick={(e) => setMode("credit")} >単位状況</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                        <Nav.Link disabled={credits === undefined} active={mode === "timetable"} onClick={(e) => setMode("timetable")} >時間割</Nav.Link>
                    </Nav.Item>
                </Nav>
                <MainTab mode={mode} credits={credits} setCredits={saveCredits} rules={rules} />
            </div>
        </>
    )
}

export default CheckPage;
