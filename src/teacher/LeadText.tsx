import React, { FunctionComponent, useState } from 'react';

type TextSubmitProps = {
    initialText: string,
    submitFunc: (text: string) => void
}

//TODO: consider using an html form with a ref, as in this example: https://github.com/reduxjs/redux/blob/master/examples/todos/src/containers/AddTodo.js
const TextSubmit: FunctionComponent<TextSubmitProps> = ({ initialText, submitFunc }) => {

    const [text, setText] = useState(initialText);


    return <>
        <h2>Please enter or paste in the text</h2>
        <textarea onChange={e => setText(e.target.value)} value={text}></textarea>
        <button onClick={() => submitFunc(text)}>Submit</button>
    </>

}

export default TextSubmit;