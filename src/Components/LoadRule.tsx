import { FC, useState } from 'react';
import Form from "react-bootstrap/Form";

export type Rules = {
    title: string;
    creditRules: CreditRule[];
    gradePointAverageRule: GradePointAverageRule;
    passEvaluation: string[];
    unknownEvaluation: string[];
}

export type CreditRule = {
    description: string;
    groups: string[];
    divisions: string[];
    minimumCredit: number;
    requiredCredits: string[];
}

export type GradePointAverageRule = {
    evaluationConverts: EvaluationConvert[];
    minimumGradePointAverage: number;
}

export type EvaluationConvert = {
    evaluation: string;
    gradePoint: number;
}

type Props = {
    setRules: (data: Rules) => void
}

type RuleFile = {
    name: string;
    title: string;
}


const LoadRule: FC<Props> = ({ setRules }) => {
    const [ruleFiles, setRuleFiles] = useState<RuleFile[]>();


    const loadRuleList = () => {
        fetch("rule/rule.json")
            .then(response => response.json())
            .then(data => {
                setRuleFiles(data);
            });
    };

    const loadRuleFile = (rulePath: string) => {
        fetch("rule/" + rulePath)
            .then(response => response.json())
            .then(data => {
                setRules(data);
            });
    };

    return (
        <>
            <Form.Select onChange={(e) => loadRuleFile(e.target.value)} onClick={(e) => loadRuleList()}>
                <option hidden>確認する要件を選択してください</option>
                {ruleFiles && ruleFiles.map((data) => {
                    return (
                        <option value={data.name}>{data.title}</option>
                    )
                })}
            </Form.Select>
        </>
    );
};


export default LoadRule;
