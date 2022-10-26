
import { FC } from 'react';
import { Credits } from './LoadCredit';
import { Rules } from './LoadRule';
import { Nav } from 'react-bootstrap'
import { Route, Routes } from "react-router";
import { NavLink } from 'react-router-dom'
import CheckRule from './CheckRule';
import ListCredit from './ListCredit';

type Props = {
    rules: Rules | undefined;
    credits: Credits | undefined;
}


const CheckMenu: FC<Props> = ({ rules, credits }) => {
    return (
        <>
            {rules && credits &&
                <>
                    <Nav fill variant="tabs">
                        <Nav.Item >
                            <Nav.Link as={NavLink} to="/check">要件チェック</Nav.Link>
                        </Nav.Item>
                        <Nav.Item >
                            <Nav.Link as={NavLink} to="/credits">単位状況</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Routes>
                        <Route path="/check" element={<CheckRule rules={rules} credits={credits} />} />
                        <Route path="/credits" element={<ListCredit  credits={credits} />} />
                    </Routes >
                </>
            }
        </>
    );
};

export default CheckMenu;
