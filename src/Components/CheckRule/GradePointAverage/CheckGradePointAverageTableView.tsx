import { FC } from 'react';
import { Credit } from '../../Credit/Credit';
import { Rules } from '../../Rule/Rule';
import CheckMark from '../CheckMark';
import Table from 'react-bootstrap/Table';
import { CheckGradePointAverageRule } from './CheckGradePointAverage';

type Props = {
    rules: Rules;
    credits: Credit[];
    isSchedule: boolean;
}

const CheckGradePointAverageTableView: FC<Props> = ({ rules, credits, isSchedule }) => {
    const [result, gradePointAverage] = CheckGradePointAverageRule(rules.minimumGradePointAverage, credits, isSchedule);
    return (
        <>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>条件</th>
                        <th>GPA</th>
                        <th>状態</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{rules.minimumGradePointAverage}以上</td>
                        <td>{gradePointAverage}</td>
                        <td><CheckMark result={result} /></td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default CheckGradePointAverageTableView;
