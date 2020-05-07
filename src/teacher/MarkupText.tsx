import React, { FunctionComponent } from 'react';


const MarkUp: FunctionComponent<{ text: string }> = ({ text }) => {

    return <>
        <p>{text}</p>
    </>
}

export default MarkUp;