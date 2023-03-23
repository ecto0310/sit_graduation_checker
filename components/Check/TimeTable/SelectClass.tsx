import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';
import { Class, Classes } from '../../../interfaces/TimeTables';

type SelectClassProps = {
    classes?: Classes;
    setClasses: (classes: Classes) => void;
}

const SelectClass = ({ classes, setClasses }: SelectClassProps) => {

    const loadClass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? [...Array.from(e.target.files)] : [];
        let classes: Class[] = [];
        let promises: Promise<void>[] = [];
        files.forEach(file => {
            const promise = file.text().then(text => {
                classes = classes.concat(JSON.parse(text).classes);
            });
            promises.push(promise);
        });
        Promise.all(promises)
            .then(() => {
                setClasses({ classes: classes });
            })
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
                    <Form.Control type="file" accept="application/json" onChange={loadClass} multiple />
                </Col>
            </Row>
        </>
    )
}

export default SelectClass;
