import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Credit, Credits } from '../../types/Credits';
import { Rules } from '../../types/Rules/Rules';
import { FilterMaximumCredit } from './Filter/FilterMaximumCredit';
import ResultMark from './ResultMark';
import MinimumCreditRule, { CalcMinimumCreditRule } from './Rule/MinimumCreditRule';
import MinimumGPARule, { CalcMinimumGPARule } from './Rule/MinimumGPARule';

type ListRuleProps = {
    credits: Credits;
    rules: Rules;
}

const ListRule = ({ credits, rules }: ListRuleProps) => {
    const filter = (): Credit[] => {
        let validCredits = credits.credits;
        rules.filters?.forEach((filter) => {
            if (filter.type == "maximumCredit") {
                validCredits = FilterMaximumCredit(validCredits, filter)
            }
        })
        return validCredits;
    }

    const filteredCredit = filter();

    const results = rules.rules
        .map((rule) => {
            if (rule.type == "minimumCredit") {
                const [result] = CalcMinimumCreditRule(rule, filteredCredit, rules.creditInfo.passGrade);
                return result;
            } else if (rule.type == "minimumGPA") {
                const [result] = CalcMinimumGPARule(rule, filteredCredit, rules.creditInfo.gradePoint);
                return result;
            }
        });
    const result = results.every((result) => result == "pass") ? "pass" :
        results.some((result) => result == "fail") ? "fail" : "unknown";

    return (
        <>
            <h3>判定結果: <ResultMark result={result} /></h3>
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
                                return <MinimumCreditRule key={index} rule={rule} credits={filteredCredit} passGrade={rules.creditInfo.passGrade} />
                            } else if (rule.type = "minimumGPA") {
                                return <MinimumGPARule key={index} rule={rule} credits={filteredCredit} gradePoint={rules.creditInfo.gradePoint} />
                            }
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ListRule;
