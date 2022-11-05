import { FC } from 'react';
import { Credits } from './Credit';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type Props = {
    setCredits: (data: Credits) => void
}

const LoadCreditView: FC<Props> = ({ setCredits }) => {
    const loadCreditFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        var file = e.currentTarget.files![0];
        file.text().then(text => {
            setCredits(JSON.parse(text));
        });
    }

    return (
        <>
            <Form>
                <Row>
                    <Col sm="2">
                        <Form.Label>単位情報ファイル</Form.Label>
                    </Col>
                    <Col sm="10">
                        <Form.Control type="file" onChange={loadCreditFile} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default LoadCreditView;
