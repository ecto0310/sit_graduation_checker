import { FC, useState } from 'react';
import { Rules } from './Rule';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type Props = {
    setRules: (data: Rules) => void
}

type RuleFiles = {
    ruleFiles: RuleFile[];
}

type RuleFile = {
    name: string;
    title: string;
}


const LoadRuleView: FC<Props> = ({ setRules }) => {
    const [ruleFiles, setRuleFiles] = useState<RuleFiles>({ ruleFiles: [] });
    const [isPresetRuleFile, setIsPresetRuleFile] = useState<boolean>(true);

    const loadRuleList = () => {
        fetch("ruleFiles.json")
            .then(response => response.json())
            .then(data => setRuleFiles(data));
    };

    const loadRuleFile = (rulePath: string) => {
        fetch("rules/" + rulePath)
            .then(response => response.json())
            .then(data => setRules(data));
    };

    const loadExternalRuleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        var file = e.currentTarget.files![0];
        file.text().then(text => {
            let data: Rules = JSON.parse(text);
            setRules(data);
        });
    };

    return (
        <>
            <Form>
                <Row>
                    <Col sm="2">
                        <Form.Label>
                            条件ファイル
                        </Form.Label>
                    </Col>
                    <Col sm="8">
                        {
                            isPresetRuleFile ?
                                <Form.Select onChange={e => loadRuleFile(e.target.value)} onClick={loadRuleList}>
                                    <option hidden>確認する要件を選択してください</option>
                                    {ruleFiles && ruleFiles.ruleFiles.map((ruleFile) => <option key={ruleFile.name} value={ruleFile.name}>{ruleFile.title}</option>)}
                                </Form.Select> :
                                <Form.Control type="file" onChange={loadExternalRuleFile} />
                        }
                    </Col>
                    <Col sm="2">
                        <Form.Check className="m-1" type="switch" label="外部条件ファイル" onClick={(e) => setIsPresetRuleFile(!isPresetRuleFile)} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};


export default LoadRuleView;
