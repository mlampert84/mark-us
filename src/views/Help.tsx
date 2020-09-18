import React, { FunctionComponent, ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';

type props = {
    show: boolean,
    close: () => void
}

const helpIntro: string =
    "The Satzanalyzator is a grammar annotation tool. " +
    "It allows students of German to " +
    "identify the most important parts of speech in a sentence. " +
    "It arose from the pedagogical insight that learning to read in German " +
    "is best accomplished by identifying key parts of speech, namely " +
    "a verb and the various nouns and pronouns that the verb coordinates, " +
    "such as the subject, accusative object, dative object, etc."

const helpInstructions: string[] =
    [
        "Enter the text you want to annote, or use the example text.",
        "Click on the part of speech you want to identify.",
        "Select the word(s) in the text that correspond to that part of speech."
    ]


const instructionList: ReactNode[] =
    helpInstructions.map((text, index) => <li key={index}>{text}</li>)

const HelpModal: FunctionComponent<props> = ({ show, close }: props) => {

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>About This App</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{helpIntro}</p>
                <p>How to use the application:</p>
                <ul className={"helpList"}>
                    {instructionList}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Okay
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HelpModal;