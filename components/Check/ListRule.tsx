import Table from 'react-bootstrap/Table';
import { Credits } from '../../types/credits';
import { Rules } from '../../types/rules';
import MinimumCreditRule from './Rule/MinimumCreditRule';

type ListRuleProps = {
    credits: Credits;
    rules: Rules;
}

const ListRule = ({ credits, rules }: ListRuleProps) => {
    const passCredits = credits.credits.filter((credits) => rules.creditInfo.passGrade.includes(credits.grade));

    return (
        <>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>条件</th>
                        <th>要求</th>
                        <th>現在</th>
                        <th>不足</th>
                        <th>結果</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rules.rules.map((rule, index) => {
                            if (rule.type == "minimumCredit") {
                                return <MinimumCreditRule key={index} rule={rule} credits={passCredits} />;
                            }
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ListRule;
