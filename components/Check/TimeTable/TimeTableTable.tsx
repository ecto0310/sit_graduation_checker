import { Credits } from '../../../interfaces/Credits';
import { CreditInfo } from '../../../interfaces/Rules/Rules';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { times } from '../../../interfaces/TimeTables';

type TableProps = {
    semester: string;
    day: string;
    credits: Credits;
    setCredits: (credits: Credits) => void;
    creditInfo: CreditInfo;
    setTime: (time: string) => void;
    setModalShow: (show: boolean) => void;
}

const TimeTableTable = ({ semester, day, credits, setCredits, creditInfo, setTime, setModalShow }: TableProps) => {
    const getCreditIndex = (semester: string, day: string, time: string): number | undefined => {
        const credit = credits.credits.filter((credits) => credits.semester == semester && credits.day == day && credits.time == time);
        if (credit.length == 0) {
            return undefined;
        }

        return credits.credits.indexOf(credit[0]);
    }


    return (
        <>
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
        </>
    )
}

export default TimeTableTable;
