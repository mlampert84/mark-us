import React, { FunctionComponent } from 'react';
import { Modal, Button } from 'react-bootstrap';

type props = {
    show: boolean,
    close: () => void,
    open: () => void;
}



const HelpModal: FunctionComponent<props> = ({ show, close, open }: props) => {

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Close
                </Button>
                <Button variant="primary" onClick={close}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HelpModal;