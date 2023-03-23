import { Accordion, Modal } from 'react-bootstrap';
import { Credits } from '../../../interfaces/Credits';
import { CreditInfo } from '../../../interfaces/Rules/Rules';
import { Classes } from '../../../interfaces/TimeTables';
import ListOtherClass from './SelectClass/ListOtherClass';

type ModalClassProps = {
    modalShow: boolean;
    setModalShow: (view: boolean) => void;
    classes: Classes;
    semester: string;
    day: string;
    time: string;
    credits: Credits;
    setCredits: (credits: Credits) => void;
    creditInfo: CreditInfo;
}

const ModalSelectClass = ({ modalShow, setModalShow, classes, semester, day, time, credits, setCredits, creditInfo }: ModalClassProps) => {
    return (
        <>
            <Modal fullscreen={true} show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        授業選択
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>未割り当て授業</Accordion.Header>
                            <Accordion.Body>
                                <ListOtherClass semester={semester} day={day} time={time} credits={credits} setCredits={setCredits} creditInfo={creditInfo} setModalShow={setModalShow} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>授業データ</Accordion.Header>
                            <Accordion.Body>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalSelectClass;
