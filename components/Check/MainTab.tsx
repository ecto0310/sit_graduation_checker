import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Nav } from 'react-bootstrap'
import ListCredit from "../../components/Check/ListCredit";
import ListRule from "../../components/Check/ListRule";
import { Credits } from "../../types/Credits";
import { Rules } from "../../types/Rules/Rules";

type MainTabProps = {
    mode: string;
    credits?: Credits;
    setCredits: (credits: Credits) => void;
    rules?: Rules;
}

const MainTab = ({ mode, credits, setCredits, rules }: MainTabProps) => {
    switch (mode) {
        case "check":
            if (rules) {
                return <ListRule credits={credits || { credits: [] }} rules={rules} />;
            }
            return (
                <Alert variant={"primary"} className="mt-1">
                    要件情報が存在しません
                </Alert>
            );
        case "credit":
            if (credits) {
                return <ListCredit credits={credits || { credits: [] }} setCredits={setCredits} creditInfo={rules?.creditInfo!} />;
            }
            return (
                <Alert variant={"primary"} className="mt-1">
                    単位情報が存在しません
                </Alert>
            );
    }
    return (
        <Alert variant={"primary"} className="mt-1">
            表示する情報が存在しません
        </Alert>
    );
}

export default MainTab;
