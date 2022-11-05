import { FC } from 'react';
import { Credits } from './Credit/Credit';
import { Rules } from './Rule/Rule';
import { Nav } from 'react-bootstrap'
import { Route, Routes } from "react-router";
import { NavLink } from 'react-router-dom'
import CheckRuleView from './CheckRule/CheckRuleView';
import ListCreditView from './ListCredit/ListCreditView';

type Props = {
    rules: Rules | undefined;
    credits: Credits | undefined;
    setCredits: (data: Credits) => void;
}


const MainView: FC<Props> = ({ rules, credits, setCredits }) => {
    return (
        <>
            <Nav fill variant="tabs">
                <Nav.Item >
                    <Nav.Link disabled={rules === undefined} as={NavLink} to="/check">要件チェック</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                    <Nav.Link disabled={credits === undefined} as={NavLink} to="/credit">単位状況</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className="mt-2">
                <Routes>
                    <Route path="/check" element={<CheckRuleView rules={rules || { title: "", creditRules: [], limits: [], minimumGradePointAverage: 0 }} credits={credits || { credits: [] }} />} />
                    <Route path="/credit" element={<ListCreditView credits={credits || { credits: [] }} setCredits={setCredits} />} />
                </Routes >
            </div>
        </>
    );
};

export default MainView;
