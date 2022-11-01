
import { FC, useState } from 'react';
import { Credits, Credit } from './LoadCredit';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { evaluations } from './Evaluation';

type Props = {
    credits: Credits;
    setCredit: (data: Credits) => void;
}


const ListCredit: FC<Props> = ({ credits, setCredit }) => {
    const [group, setGroup] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [division, setDivision] = useState<string>("");
    const [count, setCount] = useState<number>(0);
    const [evaluation, setEvaluation] = useState<string>(evaluations[0]);

    const removeCredit = (index: number) => {
        const deletedCredits = { ...credits };
        deletedCredits.credits.splice(index, 1);
        setCredit(deletedCredits);
    }

    const addCredit = (group: string, name: string, division: string, count: number, evaluation: string) => {
        const newCredit: Credit = { group: group, name: name, division: division, count: count, evaluation: evaluation };
        const addedCredits = { ...credits };
        addedCredits.credits.unshift(newCredit);
        setCredit(addedCredits);
    }

    return (
        <>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>系列</th>
                        <th>科目名</th>
                        <th>区分</th>
                        <th>単位数</th>
                        <th>評価</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control onChange={e => setGroup(e.target.value)} />
                        </td>
                        <td>
                            <Form.Control onChange={e => setName(e.target.value)} />
                        </td>
                        <td>
                            <Form.Control onChange={e => setDivision(e.target.value)} />
                        </td>
                        <td>
                            <Form.Control type="number" onChange={e => setCount(parseInt(e.target.value))} />
                        </td>
                        <td>
                            <Form.Select onChange={e => setEvaluation(e.target.value)} >
                                {evaluations.map((data) => <option value={data}>{data}</option>)}
                            </Form.Select>
                        </td>
                        <td><Button variant="primary" onClick={() => { addCredit(group, name, division, count, evaluation) }}><FontAwesomeIcon icon={faPlusSquare} /></Button></td>
                    </tr>
                    {credits.credits.map((credit, index) => {
                        return (
                            <tr>
                                <td>{credit.group}</td>
                                <td>{credit.name}</td>
                                <td>{credit.division}</td>
                                <td>{credit.count}</td>
                                <td>{credit.evaluation}</td>
                                <td><Button variant="danger" onClick={() => { removeCredit(index) }}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default ListCredit;
