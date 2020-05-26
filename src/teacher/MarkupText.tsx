import React, { FunctionComponent } from 'react';
import { Selection, SelectionType } from '../types/Selection';

type props = {
    text: string;
    selections: Selection[];
    onSelection: (selection?: Selection) => void;
}

const MarkUp: FunctionComponent<props> = ({ text, selections, onSelection }) => {

    let showSelection = () => {
        console.log(window.getSelection());

        const range = window.getSelection()?.getRangeAt(0);
        // window.getSelection()?.removeAllRanges();
        console.log("Range:", range);
        if (range !== undefined) {
            const selection: Selection = {
                id: Math.random().toString(36).substring(2, 7),
                type: { name: "subjekt", color: "green" },
                begin: range.startOffset,
                end: range.endOffset
            }
            onSelection(selection);

            let displaySelections = [];

            for (let s of selections) {
                console.log("Redering a selection")
                displaySelections.push(<p>{JSON.stringify(s)}hey</p>)
            }

        }
    };

    let displaySelections: any = text;
    console.log(selections);

    for (let s of selections) {
        let beginText = text.slice(0, s.begin);
        let spanText = text.slice(s.begin, s.end);
        let endText = text.slice(s.end, text.length);

        displaySelections = [beginText, <span style={{ backgroundColor: s.type.color }} key={s.id}>{spanText}</span>, endText]
    }

    return <>
        <p onMouseUp={showSelection} id="text-root">{displaySelections}</p>
        <p>dfsd<span>here</span>sdf<span>wsdfsdf</span>sd</p>
    </>
}

export default MarkUp;