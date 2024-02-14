import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Credit, Credits } from '../../../interfaces/Credits';
import { CreditInfo } from '../../../interfaces/Rules/Rules';
import AddCredit from './AddCredit';

type ListCreditProps = {
    credits: Credits;
    setCredits: (credits: Credits) => void;
    creditInfo: CreditInfo;
}

const ListCredit = ({ credits, setCredits, creditInfo }: ListCreditProps) => {
    const grades = creditInfo.passGrade.concat(creditInfo.failGrade).concat(creditInfo.unknownGrade)

    const exportCredits = () => {
        const blob = new Blob(
            [JSON.stringify({ "credits": credits })],
            { type: 'application/json' }
        );
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "edit_credits.json";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <>
            <Button className='mb-2' onClick={() => exportCredits()}>単位一覧のエクスポート</Button>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>系列</th>
                        <th>区分</th>
                        <th>科目名</th>
                        <th>単位数</th>
                        <th>評価</th>
                        <th>期</th>
                        <th>時間</th>
                        <th>編集</th>
                    </tr>
                </thead>
                <tbody>
                    <AddCredit addCredit={(credit: Credit) => setCredits({ ...credits, credits: [credit, ...credits.credits] })} creditInfo={creditInfo} />
                    {
                        credits.credits.map((credit, index) => {
                            return (
                                <tr key={index}>
                                    <td>{credit.group}</td>
                                    <td>{credit.division}</td>
                                    <td>{credit.name}</td>
                                    <td>{credit.count}</td>
                                    <td>
                                        <Form.Select value={credit.grade} onChange={(e) => { credits.credits.splice(index, 1, { ...credit, grade: e.target.value }); setCredits({ ...credits, credits: credits.credits }) }}>
                                            {grades.map((data, index) => <option key={index} value={data}>{data}</option>)}
                                        </Form.Select>
                                    </td>
                                    <td>{credit.semester}</td>
                                    <td>{credit.day} {credit.time}</td>
                                    <td><Button variant="danger" onClick={() => { credits.credits.splice(index, 1); setCredits({ ...credits, credits: credits.credits }) }}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ListCredit;
