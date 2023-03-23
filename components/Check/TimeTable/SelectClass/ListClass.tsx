import { Credits } from '../../../../interfaces/Credits';
import { CreditInfo } from '../../../../interfaces/Rules/Rules';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Classes, days } from '../../../../interfaces/TimeTables';
import { useState } from 'react';

type ListClass = {
    semester: string;
    day: string;
    time: string;
    classes: Classes;
    credits: Credits;
    setCredits: (credits: Credits) => void;
    creditInfo: CreditInfo;
    setModalShow: (show: boolean) => void;
}

const ListClass = ({ semester, day, time, classes, credits, setCredits, creditInfo, setModalShow }: ListClass) => {
    const [isSchedule, setIsSchedule] = useState<boolean>(false);

    const getClassesIndexs = (): number[] => {
        let indexs: number[] = [];
        classes.classes.forEach((e, index) => {
            if (credits.credits.every(credit => credit.name != e.name)) {
                indexs.push(index);
            }
        });
        return indexs;
    }

    const classIndexs = getClassesIndexs();

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
                        <th>編集</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classIndexs.map((classIndex, index) => {
                            const e = classes.classes[classIndex];
                            return (
                                <tr key={index}>
                                    <td>{e.group}</td>
                                    <td>{e.division}</td>
                                    <td>{e.name}</td>
                                    <td>{e.count}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => {
                                            credits.credits.push({ group: e.group, division: e.division, name: e.name, count: e.count, grade: creditInfo.unknownGrade[0], semester: semester, day: day, time: time }); setCredits({ ...credits, credits: credits.credits }); setModalShow(false);
                                        }}><FontAwesomeIcon icon={faPlusSquare} /></Button>
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

export default ListClass;
