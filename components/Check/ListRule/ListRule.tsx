import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Credit, Credits } from '../../../interfaces/Credits';
import { Rules } from '../../../interfaces/Rules/Rules';
import { FilterMaximumCredit } from './Filter/FilterMaximumCredit';
import ResultMark from './ResultMark';
import MinimumCreditRule, { CalcMinimumCreditRule } from './Rule/MinimumCreditRule';
import MinimumGPARule, { CalcMinimumGPARule } from './Rule/MinimumGPARule';
import Form from "react-bootstrap/Form";
import { Result } from '../../../interfaces/Result';

type ListRuleProps = {
    credits: Credits;
    rules: Rules;
}

const ListRule = ({ credits, rules }: ListRuleProps) => {
    const [isSchedule, setIsSchedule] = useState<boolean>(false);

    const passGrade = (): string[] => {
        if (isSchedule) {
            return rules.creditInfo.passGrade.concat(rules.creditInfo.unknownGrade);
        }
        return rules.creditInfo.passGrade;
    }

    const filter = (): Credit[] => {
        let validCredits = credits.credits;
        let sortKey = rules.creditInfo.passGrade.concat(rules.creditInfo.failGrade).concat(rules.creditInfo.unknownGrade);
        validCredits.sort((l, r) => {
            if (l.name == r.name) {
                return sortKey.indexOf(l.grade) - sortKey.indexOf(r.grade);
            }
            if (l.name < r.name) {
                return -1;
            }
            return 1;
        });
        validCredits = validCredits.filter((validCredit, i) => {
            if (i == 0) {
                return true;
            }
            return validCredit.name != validCredits[i - 1].name;
        });
        rules.filters?.forEach((filter) => {
            if (filter.type == "maximumCredit") {
                validCredits = FilterMaximumCredit(validCredits, filter)
            }
        })
        return validCredits;
    }

    const results = (): Result[] => {
        return rules.rules
            .map((rule) => {
                if (rule.type == "minimumCredit") {
                    const [result] = CalcMinimumCreditRule(rule, filter(), passGrade());
                    return result;
                } else if (rule.type == "minimumGPA") {
                    const [result] = CalcMinimumGPARule(rule, filter(), rules.creditInfo.gradePoint, isSchedule);
                    return result;
                }
                return "unknown";
            });
    }

    const result = (): Result => {
        const results_cache = results();
        return results_cache.every((result) => result == "pass") ? "pass" :
            results_cache.some((result) => result == "fail") ? "fail" : "unknown";
    }

    return (
        <>
            <h3>判定結果: <ResultMark result={result()} /></h3>
            <Form.Check className="m-1" type="switch" label="取得予定単位を含める" onClick={(e) => setIsSchedule(!isSchedule)} />
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
                                return <MinimumCreditRule key={index} rule={rule} credits={filter()} passGrade={passGrade()} />
                            } else if (rule.type = "minimumGPA") {
                                return <MinimumGPARule key={index} rule={rule} credits={filter()} gradePoint={rules.creditInfo.gradePoint} isSchedule={isSchedule} />
                            }
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ListRule;
