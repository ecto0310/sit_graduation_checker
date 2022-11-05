import { FC, useState } from 'react';
import { Credits, Credit } from '../Credit/Credit';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { evaluations } from '../Evaluation';

type Props = {
    credits: Credits;
    setCredits: (data: Credits) => void;
}

const ListCreditView: FC<Props> = ({ credits, setCredits }) => {
    const [sortedBy, setSortedBy] = useState<string>("group");
    const [isDescending, setIsDescending] = useState<boolean>(false);
    const [group, setGroup] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [division, setDivision] = useState<string>("");
    const [count, setCount] = useState<number>(0);
    const [evaluation, setEvaluation] = useState<string>(evaluations[0]);
    const [period, setPeriod] = useState<string>("未定");

    const compare = (l: Credit, r: Credit, newSortedBy: string, equal: boolean): number => {
        switch (newSortedBy) {
            case "group":
                if (l.group === r.group) {
                    return compare(l, r, "division", true);
                }
                return l.group < r.group ? 1 : -1;
            case "name":
                if (l.name === r.name) {
                    return equal ? compare(l, r, "count", true) : compare(l, r, "group", true);
                }
                return l.name < r.name ? 1 : -1;
            case "count":
                if (l.count === r.count) {
                    return equal ? compare(l, r, "evaluation", true) : compare(l, r, "group", true);
                }
                return l.count < r.count ? 1 : -1;
            case "evaluation":
                if (l.evaluation === r.evaluation) {
                    return equal ? compare(l, r, "period", true) : compare(l, r, "group", true);
                }
                return evaluations.indexOf(l.evaluation) < evaluations.indexOf(r.evaluation) ? 1 : -1;
        }
        if (l.period === r.period) {
            return compare(l, r, "group", true);
        }
        return l.period < r.period ? 1 : -1;
    };

    const changeSort = (newSortedBy: string) => {
        const newCredits = { ...credits };
        if (sortedBy === newSortedBy) {
            setIsDescending(!isDescending);
            newCredits.credits = newCredits.credits.sort((l, r) => { return compare(l, r, newSortedBy, false); })
        } else {
            setSortedBy(newSortedBy);
            setIsDescending(false);
        }
        if (sortedBy === newSortedBy && !isDescending) {
            newCredits.credits.reverse();
        }
        setCredits(newCredits);
    };

    const addCredit = () => {
        const newCredit: Credit = { group: group, name: name, division: division, count: count, evaluation: evaluation, period: period };
        const addedCredits = { ...credits };
        addedCredits.credits.unshift(newCredit);
        setCredits(addedCredits);
    }

    const removeCredit = (index: number) => {
        const deletedCredits = { ...credits };
        deletedCredits.credits.splice(index, 1);
        setCredits(deletedCredits);
    };

    return (
        <>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th onClick={() => changeSort('group')}>系列</th>
                        <th onClick={() => changeSort('division')}>区分</th>
                        <th onClick={() => changeSort('name')}>科目名</th>
                        <th onClick={() => changeSort('count')}>単位数</th>
                        <th onClick={() => changeSort('evaluation')}>評価</th>
                        <th onClick={() => changeSort('period')}>期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control value={group} onChange={e => setGroup(e.target.value)} />
                        </td>
                        <td>
                            <Form.Control value={division} onChange={e => setDivision(e.target.value)} />
                        </td>
                        <td>
                            <Form.Control value={name} onChange={e => setName(e.target.value)} />
                        </td>
                        <td>
                            <Form.Control value={count} type="number" onChange={e => setCount(parseInt(e.target.value))} />
                        </td>
                        <td>
                            <Form.Select value={evaluation} onChange={e => setEvaluation(e.target.value)} >
                                {evaluations.map((data) => <option value={data}>{data}</option>)}
                            </Form.Select>
                        </td>
                        <td>
                            <Form.Control value={period} onChange={e => setPeriod(e.target.value)} />
                        </td>
                        <td><Button variant="primary" onClick={() => { addCredit() }}><FontAwesomeIcon icon={faPlusSquare} /></Button></td>
                    </tr>
                    {
                        credits.credits.map((credit, index) => {
                            return (
                                <tr>
                                    <td>{credit.group}</td>
                                    <td>{credit.division}</td>
                                    <td>{credit.name}</td>
                                    <td>{credit.count}</td>
                                    <td>{credit.evaluation}</td>
                                    <td>{credit.period}</td>
                                    <td><Button variant="danger" onClick={() => { removeCredit(index) }}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    );
};

export default ListCreditView;
