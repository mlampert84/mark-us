import React, { FunctionComponent, ReactNode } from "react";
import { Clause, ClausePart, SelectionType, display, mapGrammarPartToColor } from "../types/Clause";
import { Maybe, Nothing } from "../util/Maybe";
import { Selection } from "../types/Selection";
import { Table } from "react-bootstrap";


type props = {
    text: string,
    clauses: Map<string, Clause>;
    selecting: SelectionType,
    onSelectionTypeSelect: (type: SelectionType) => void;
    onSelectionDelete: (id: string, part: ClausePart) => void;
}

function renderClausePartHead(
    clauseIndex: string,
    clausePart: ClausePart,
    selecting: SelectionType,
    onSelectionTypeSelect: (s: SelectionType) => void): ReactNode {

    let onClick = () => { onSelectionTypeSelect({ clauseId: clauseIndex, part: clausePart }) }

    let currentlyActive = selecting.clauseId === clauseIndex && selecting.part === clausePart;

    let style = { backgroundColor: mapGrammarPartToColor(clausePart) }

    return <th
        key={clauseIndex + clausePart}
        onClick={onClick}
        className={"pointer white-text" + (currentlyActive ? 'selecting' : '')}
        style={style}>{display[clausePart][0]}
    </th>;
}

function renderClausePartBody(text: string,
    selection: Maybe<Selection>,
    clauseIndex: string,
    clausePart: ClausePart,
    selecting: SelectionType,
    onSelectionDelete: (id: string, part: ClausePart) => void
): ReactNode {

    let cell: ReactNode;

    let currentlyActive = selecting.clauseId === clauseIndex && selecting.part === clausePart;

    if (selection === Nothing) {
        cell = <td>&nbsp;</td>;
    }
    else {

        let onDeleteClick = () => { onSelectionDelete(clauseIndex, clausePart) };

        const testSelection: String = text.substr(selection.begin, selection.end - selection.begin);

        let displaySelection: String;

        if (currentlyActive) {
            displaySelection = "Selecting...";
        }
        else if (testSelection === "s") {
            displaySelection = "es";
        } else {
            displaySelection = testSelection;
        }

        cell = <td className="closeButtonHolder">
            {displaySelection}
            <span className="closeButton" onClick={onDeleteClick}>&times;</span>
        </td>
    }

    return cell;

}

function renderClause(text: string,
    clauseIndex: string,
    clause: Clause,
    selecting: SelectionType,
    onSelectionTypeSelect: (s: SelectionType) => void,
    onSelectionDelete: (id: string, part: ClausePart) => void): ReactNode {

    const tableHead = [];
    const tableBody = [];

    for (const [key, value] of Object.entries(clause)) {
        tableHead.push(renderClausePartHead(clauseIndex, key as ClausePart, selecting, onSelectionTypeSelect));
        tableBody.push(renderClausePartBody(text, value, clauseIndex, key as ClausePart, selecting, onSelectionDelete));

    }

    return <Table striped bordered key={clauseIndex}>
        <thead><tr>{tableHead}</tr></thead>
        <tbody><tr>{tableBody}</tr></tbody>
    </Table>;

}

const Clauses: FunctionComponent<props> = ({ text, clauses, selecting, onSelectionTypeSelect, onSelectionDelete }: props) => {

    let clauseDisplay: ReactNode[] = [];
    clauses.forEach((clause, index) => {
        clauseDisplay.push(renderClause(text, index, clause, selecting, onSelectionTypeSelect, onSelectionDelete));

    })

    return <>{clauseDisplay}</>;
}

export default Clauses;