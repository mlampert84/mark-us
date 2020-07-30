import React, { FunctionComponent, ReactNode } from "react";
import { Clause, ClausePart, SelectionType } from "../types/Clause";
import { Maybe, Nothing } from "../util/Maybe";
import { Selection } from "../types/Selection";


type props = {
    text: string,
    clauses: Map<string, Clause>;
    onSelectionTypeSelect: (type: SelectionType) => void;

}

function renderClausePart(text: string,
    clauseIndex: string,
    clausePart: ClausePart, selection: Maybe<Selection>,
    onSelectionTypeSelect: (s: SelectionType) => void): ReactNode {

    let view: ReactNode;

    let onClick = () => { onSelectionTypeSelect({ clauseId: clauseIndex, part: clausePart }) }

    if (selection === Nothing) {
        view = <button onClick={onClick}>Select</button>

    }

    else {
        view = text.substr(selection.begin, selection.end - selection.begin);
    }
    return <span key={clauseIndex + clausePart}>{clausePart}
        {view}
    </span>;
}

function renderClause(text: string,
    clauseIndex: string,
    clause: Clause,
    onSelectionTypeSelect: (s: SelectionType) => void): ReactNode {

    const view = [];

    for (const [key, value] of Object.entries(clause)) {
        view.push(renderClausePart(text, clauseIndex, key as ClausePart, value, onSelectionTypeSelect));

    }

    return <div key={clauseIndex}>{view}</div>;

}

const Clauses: FunctionComponent<props> = ({ text, clauses, onSelectionTypeSelect }) => {

    let clauseDisplay: ReactNode[] = [];
    clauses.forEach((clause, index) => {
        clauseDisplay.push(renderClause(text, index, clause, onSelectionTypeSelect));

    })

    return <>{clauseDisplay}</>;
}

export default Clauses;