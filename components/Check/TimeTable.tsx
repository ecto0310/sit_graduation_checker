import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Credit, Credits } from '../../types/Credits';
import { CreditInfo } from '../../types/Rules/Rules';
import { Classes } from '../../types/TimeTables';
import ModalTimeTable from './TimeTable/ModalTimeTable';
import SelectClass from './TimeTable/SelectClass';
import SelectDay from './TimeTable/SelectDay';
import SelectSemester from './TimeTable/SelectSemester';

type TimeTableProps = {
    credits: Credits;
    setCredits: (credits: Credits) => void;
    creditInfo: CreditInfo;
}

const TimeTable = ({ credits, setCredits, creditInfo }: TimeTableProps) => {
    const [semester, setSemester] = useState<string>(creditInfo.startYear + "年度前期");
    const [day, setDay] = useState<string>("月曜日");
    const [time, setTime] = useState<string>("1限");
    const [classes, setClasses] = useState<Classes>();
    const [modalShow, setModalShow] = useState<boolean>(false);

    const times = ["1限", "2限", "3限", "4限", "5限", "6限"];

    const getCreditIndex = (semester: string, day: string, time: string): number | undefined => {
        const credit = credits.credits.filter((credits) => credits.semester == semester && credits.day == day && credits.time == time);
        if (credit.length == 0) {
            return undefined;
        }

        return credits.credits.indexOf(credit[0]);
    }

    return (
        <>
            <SelectSemester selected_semester={semester} setSemester={setSemester} startYear={creditInfo.startYear} />
            <SelectClass classes={classes} setClasses={setClasses} />
            <SelectDay selected_day={day} setDay={setDay} />
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>時限</th>
                        <th>系列</th>
                        <th>区分</th>
                        <th>科目名</th>
                        <th>単位数</th>
                        <th>評価</th>
                        <th>編集</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        times.map((time) => {
                            const creditIndex = getCreditIndex(semester, day, time);
                            const credit = credits.credits[creditIndex ?? 0];
                            return (
                                <tr>
                                    <td>{time}</td>
                                    {creditIndex == undefined ?
                                        <>
                                            <td colSpan={5}></td>
                                            <td>
                                                <Button variant="primary" onClick={() => { setTime(time); setModalShow(true); }}><FontAwesomeIcon icon={faPlusSquare} /></Button>
                                            </td>
                                        </> :
                                        <>
                                            <td>{credit.group}</td>
                                            <td>{credit.division}</td>
                                            <td>{credit.name}</td>
                                            <td>{credit.count}</td>
                                            <td>{credit.grade}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => { credits.credits.splice(creditIndex, 1); setCredits({ ...credits, credits: credits.credits }) }}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                            </td>
                                        </>
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            {classes != undefined && <ModalTimeTable modalShow={modalShow} setModalShow={setModalShow} classes={classes} />}

        </>
    )
}

export default TimeTable;
