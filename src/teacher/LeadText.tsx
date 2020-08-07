import React, { FunctionComponent, useState } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

type TextSubmitProps = {
    initialText: string,
    submitFunc: (text: string) => void
}

//TODO: consider using an html form with a ref, as in this example: https://github.com/reduxjs/redux/blob/master/examples/todos/src/containers/AddTodo.js
const TextSubmit: FunctionComponent<TextSubmitProps> = ({ initialText, submitFunc }) => {

    const [text, setText] = useState(initialText);

    return <Accordion>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
                <p>Enter new sentence.</p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <textarea onChange={e => setText(e.target.value)} value={text}></textarea>
                    <button onClick={() => submitFunc(text)}>Submit</button>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>

}

export default TextSubmit;