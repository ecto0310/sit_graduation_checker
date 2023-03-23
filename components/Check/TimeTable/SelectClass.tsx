import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';
import { Classes } from '../../../interfaces/TimeTables';

type SelectClassProps = {
    classes?: Classes;
    setClasses: (classes: Classes) => void;
}

const SelectClass = ({ classes, setClasses }: SelectClassProps) => {

    const loadClass = (e: React.ChangeEvent<HTMLInputElement>) => {
        var file = e.currentTarget.files![0];
        file.text().then(data => {
            setClasses(JSON.parse(data));
        });
    }

    useEffect(() => {
        if (classes === undefined) {
            let data = sessionStorage.getItem("class");
            if (data !== null) {
                setClasses(JSON.parse(data));
            }
        }
    });

    return (
        <>
            <Row className="mb-3">
                <Col sm="2">
                    <Form.Label>授業情報ファイル</Form.Label>
                </Col>
                <Col sm="10">
                    <Form.Control type="file" accept="application/json" onChange={loadClass} />
                </Col>
            </Row>
        </>
    )
}

export default SelectClass;
