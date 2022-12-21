import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Credit, Credits } from '../../types/Credits';
import { CreditInfo } from '../../types/Rules/Rules';
import AddCredit from './AddCredit';

type ListCreditProps = {
    credits: Credits;
    setCredits: (credits: Credits) => void;
    creditInfo: CreditInfo;
}

const ListCredit = ({ credits, setCredits, creditInfo }: ListCreditProps) => {
    return (
        <>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>系列</th>
                        <th>区分</th>
                        <th>科目名</th>
                        <th>単位数</th>
                        <th>評価</th>
                        <th>期</th>
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
                                    <td>{credit.grade}</td>
                                    <td>{credit.period}</td>
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
