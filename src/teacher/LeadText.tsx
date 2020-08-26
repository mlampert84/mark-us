import React, { FunctionComponent, useState, useRef } from 'react';
import { Accordion, Card, Button, ButtonGroup, Form, useAccordionToggle, Collapse, ButtonToolbar } from 'react-bootstrap';

type TextSubmitProps = {
    initialText: string,
    submitFunc: (text: string) => void
}

//TODO: consider using an html form with a ref, as in this example: https://github.com/reduxjs/redux/blob/master/examples/todos/src/containers/AddTodo.js
const TextSubmit: FunctionComponent<TextSubmitProps> = ({ initialText, submitFunc }) => {

    const [text, setText] = useState(initialText);

    const [open, setOpen] = useState(false);

    const submitAndClose = (text: string) => {
        submitFunc(text);
        setOpen(false);
    }


    return <Card>
        <Card.Header onClick={() => setOpen(!open)}>
            <p>Enter oder edit text.</p>
        </Card.Header>
        <Collapse in={open}>
            <div>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" rows={3} onChange={e => setText(e.target.value)} value={text}></Form.Control>
                        </Form.Group>
                        <ButtonGroup className="float-right">
                            <Button className="mr-2" onClick={() => submitAndClose(text)}>
                                Submit
                           </Button>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                        </ButtonGroup>
                    </Form>
                </Card.Body>
            </div>
        </Collapse>
    </Card>;

}

export default TextSubmit;