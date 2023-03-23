import { Alert } from 'react-bootstrap'
import ListCredit from "./ListCredit/ListCredit";
import ListRule from "../../components/Check/ListRule/ListRule";
import { Credits } from "../../interfaces/Credits";
import { Rules } from "../../interfaces/Rules/Rules";
import TimeTable from "./TimeTable/TimeTable";

type MainTabProps = {
    mode: string;
    credits: Credits;
    setCredits: (credits: Credits) => void;
    rules: Rules;
}

const MainTab = ({ mode, credits, setCredits, rules }: MainTabProps) => {
    switch (mode) {
        case "check":
            return <ListRule credits={credits} rules={rules} />;
        case "credit":
            return <ListCredit credits={credits} setCredits={setCredits} creditInfo={rules?.creditInfo!} />;
        case "timetable":
            return <TimeTable credits={credits} setCredits={setCredits} creditInfo={rules?.creditInfo!} />;
    }
    return (
        <Alert variant={"primary"} className="mt-1">
            表示する情報が存在しません
        </Alert>
    );
}

export default MainTab;
