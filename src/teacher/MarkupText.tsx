import React, { FunctionComponent } from 'react';


const MarkUp: FunctionComponent<{ text: string }> = ({ text }) => {

    let showSelection = () => {
        console.log(window.getSelection())
        console.log(window.getSelection()?.getRangeAt(0));
    };

    return <>
        <p onMouseUp={showSelection}>{text}</p>
    </>
}

export default MarkUp;