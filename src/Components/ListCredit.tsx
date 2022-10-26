
import { FC } from 'react';
import { Credits } from './LoadCredit';
import Table from 'react-bootstrap/Table';

type Props = {
    credits: Credits;
}


const ListCredit: FC<Props> = ({ credits }) => {
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
                    </tr>
                </thead>
                <tbody>
                    {credits.credits.map((credit) => {
                        return (
                            <tr>
                                <td>{credit.group}</td>
                                <td>{credit.name}</td>
                                <td>{credit.division}</td>
                                <td>{credit.count}</td>
                                <td>{credit.evaluation}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default ListCredit;
