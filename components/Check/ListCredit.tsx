import Table from 'react-bootstrap/Table';
import { Credits } from '../../types/Credits';

type ListCreditProps = {
    credits: Credits;
}

const ListCredit = ({ credits }: ListCreditProps) => {
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
                    </tr>
                </thead>
                <tbody>
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
