import React, { FunctionComponent, ReactNode } from "react";
import { Clause, ClausePart, SelectionType, display } from "../types/Clause";
import { Maybe, Nothing } from "../util/Maybe";
import { Selection } from "../types/Selection";
import { Table } from "react-bootstrap";


type props = {
    text: string,
    clauses: Map<string, Clause>;
    currentSelectionType: SelectionType,
    onSelectionTypeSelect: (type: SelectionType) => void;

}

function renderClausePartHead(
    clauseIndex: string,
    clausePart: ClausePart,
    currentSelectionType: SelectionType,
    onSelectionTypeSelect: (s: SelectionType) => void): ReactNode {

    let onClick = () => { onSelectionTypeSelect({ clauseId: clauseIndex, part: clausePart }) }

    let currentlyActive = currentSelectionType.clauseId === clauseIndex && currentSelectionType.part === clausePart;

    return <th key={clauseIndex + clausePart} onClick={onClick} className={"pointer " + (currentlyActive ? 'selecting' : '')}>{display[clausePart][0]}
    </th>;
}

function renderClausePartBody(text: string,
    selection: Maybe<Selection>): ReactNode {

    let cell: ReactNode;

    if (selection === Nothing) {
        cell = <td>&nbsp;</td>;
    }
    else {

        const testSelection: String = text.substr(selection.begin, selection.end - selection.begin);

        let displaySelection: String;

        if (testSelection === "s") {
            displaySelection = "es";
        } else {
            displaySelection = testSelection;
        }

        cell = <td>{displaySelection}</td>
    }

    return cell;

}

function renderClause(text: string,
    clauseIndex: string,
    clause: Clause,
    currentSelectionType: SelectionType,
    onSelectionTypeSelect: (s: SelectionType) => void): ReactNode {

    const tableHead = [];
    const tableBody = [];

    for (const [key, value] of Object.entries(clause)) {
        tableHead.push(renderClausePartHead(clauseIndex, key as ClausePart, currentSelectionType, onSelectionTypeSelect));
        tableBody.push(renderClausePartBody(text, value));

    }

    return <Table striped bordered key={clauseIndex}>
        <thead><tr>{tableHead}</tr></thead>
        <tbody><tr>{tableBody}</tr></tbody>
    </Table>;

}

const Clauses: FunctionComponent<props> = ({ text, clauses, currentSelectionType, onSelectionTypeSelect }) => {

    let clauseDisplay: ReactNode[] = [];
    clauses.forEach((clause, index) => {
        clauseDisplay.push(renderClause(text, index, clause, currentSelectionType, onSelectionTypeSelect));

    })

    return <>{clauseDisplay}</>;
}

export default Clauses;