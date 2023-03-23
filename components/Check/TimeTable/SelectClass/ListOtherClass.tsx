import { Credits } from '../../../../interfaces/Credits';
import { CreditInfo } from '../../../../interfaces/Rules/Rules';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { days } from '../../../../interfaces/TimeTables';
import { useState } from 'react';

type TableProps = {
    semester: string;
    day: string;
    time: string;
    credits: Credits;
    setCredits: (credits: Credits) => void;
    creditInfo: CreditInfo;
    setModalShow: (show: boolean) => void;
}

const TimeTableTable = ({ semester, day, time, credits, setCredits, creditInfo, setModalShow }: TableProps) => {
    const [isSchedule, setIsSchedule] = useState<boolean>(false);

    const getCreditIndexs = (): number[] => {
        let indexs: number[] = [];
        credits.credits.forEach((credit, index) => {
            if ((credit.semester == "" || credit.semester == semester) && !days.includes(credit.day) && (!isSchedule || creditInfo.unknownGrade.includes(credit.grade))) {
                indexs.push(index)
            }
        });
        return indexs;
    }

    const creditIndexs = getCreditIndexs();

    return (
        <>
            <Form.Check className="m-1" type="switch" label="成績未確定単位のみ表示" onClick={(e) => setIsSchedule(!isSchedule)} />
            <Table striped bordered>
                <thead>
                    <tr>
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
                        creditIndexs.map((creditIndex, index) => {
                            const credit = credits.credits[creditIndex];
                            return (
                                <tr key={index}>
                                    <td>{credit.group}</td>
                                    <td>{credit.division}</td>
                                    <td>{credit.name}</td>
                                    <td>{credit.count}</td>
                                    <td>{credit.grade}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => { credits.credits[creditIndex] = { ...credits.credits[creditIndex], semester: semester, day: day, time: time }; setCredits({ ...credits, credits: credits.credits }); setModalShow(false); }}><FontAwesomeIcon icon={faPlusSquare} /></Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TimeTableTable;
