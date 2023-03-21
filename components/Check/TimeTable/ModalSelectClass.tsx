import { Modal } from 'react-bootstrap';
import { Classes } from '../../../interfaces/TimeTables';

type ModalClassProps = {
    modalShow: boolean;
    setModalShow: (view: boolean) => void;
    classes: Classes;
}

const ModalSelectClass = ({ modalShow, setModalShow, classes }: ModalClassProps) => {

    return (
        <>
            <Modal fullscreen={true} show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        授業選択
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalSelectClass;
