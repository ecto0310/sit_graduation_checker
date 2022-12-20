import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

type RuleFiles = {
    years: Year[];
}

type Year = {
    name: string;
    departments: Department[];
}

type Department = {
    name: string;
    rules: Rule[];
}

type Rule = {
    name: string;
    file: string;
}

const SelectRule = () => {
    const router = useRouter();

    const [ruleFiles, setRuleFiles] = useState<RuleFiles>();
    const [candidateYear, setCandidateYear] = useState<Year>();
    const [candidateDepartment, setCandidateDepartment] = useState<Department>();
    const [ruleFile, setRuleFile] = useState<string>();

    useEffect(() => {
        if (ruleFiles === undefined) {
            fetch("/rule_list.json")
                .then(response => response.json())
                .then(data => { setRuleFiles(data) });
        }
    });

    const checkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        router.push({
            pathname: "/check",
            query: { ...router.query, rule: ruleFile }
        });
    }


    return (
        <>
            <Form>
                <Row className="mb-3">
                    <Col sm="2">
                        <Form.Label>
                            入学年度
                        </Form.Label>
                    </Col>
                    <Col sm="10">
                        <Form.Select onChange={e => setCandidateYear(ruleFiles!.years!.find((year) => { return year.name == e.target.value; }))}>
                            <option hidden>入学年度</option>
                            {
                                ruleFiles &&
                                ruleFiles.years.map((year) => <option key={year.name} value={year.name}>{year.name}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm="2">
                        <Form.Label>
                            学部/学科
                        </Form.Label>
                    </Col>
                    <Col sm="10">
                        <Form.Select onChange={e => setCandidateDepartment(candidateYear?.departments.find((department) => { return department.name == e.target.value; }))}>
                            <option hidden>学部/学科</option>
                            {
                                candidateYear &&
                                candidateYear.departments.map((department) => <option key={department.name} value={department.name}>{department.name}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm="2">
                        <Form.Label>
                            条件データ
                        </Form.Label>
                    </Col>
                    <Col sm="10">
                        <Form.Select onChange={e => setRuleFile(candidateDepartment?.rules.find((rule) => { return rule.file == e.target.value; })?.file)}>
                            <option hidden>条件データ</option>
                            {
                                candidateDepartment &&
                                candidateDepartment.rules.map((rule) => <option key={rule.file} value={rule.file}>{rule.name}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Button disabled={ruleFile === undefined} variant="primary" onClick={checkClick}>
                        確認
                    </Button>
                </Row>
            </Form>
        </>
    )
}

export default SelectRule;
