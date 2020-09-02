import React, { FunctionComponent, ReactNode } from "react";
import { Clause, ClausePart, SelectionType } from "../types/Clause";
import { Maybe, Nothing } from "../util/Maybe";
import { Selection } from "../types/Selection";
import { Table } from "react-bootstrap";


type props = {
    text: string,
    clauses: Map<string, Clause>;
    onSelectionTypeSelect: (type: SelectionType) => void;

}

function renderClausePartHead(text: string,
    clauseIndex: string,
    clausePart: ClausePart, selection: Maybe<Selection>,
    onSelectionTypeSelect: (s: SelectionType) => void): ReactNode {

    let view: ReactNode;

    let onClick = () => { onSelectionTypeSelect({ clauseId: clauseIndex, part: clausePart }) }

    return <th key={clauseIndex + clausePart} onClick={onClick}>{clausePart}
    </th>;
}

function renderClausePartBody(text: string,
    clauseIndex: string,
    clausePart: ClausePart, selection: Maybe<Selection>): ReactNode {

    let cell: ReactNode;

    if (selection === Nothing) {
        cell = <td></td>;
    }
    else {
        cell = <td>{text.substr(selection.begin, selection.end - selection.begin)}</td>
    }

    return cell;

}

function renderClause(text: string,
    clauseIndex: string,
    clause: Clause,
    onSelectionTypeSelect: (s: SelectionType) => void): ReactNode {

    const tableHead = [];
    const tableBody = [];

    for (const [key, value] of Object.entries(clause)) {
        tableHead.push(renderClausePartHead(text, clauseIndex, key as ClausePart, value, onSelectionTypeSelect));
        tableBody.push(renderClausePartBody(text, clauseIndex, key as ClausePart, value));

    }

    return <Table striped bordered key={clauseIndex}>
        <thead><tr>{tableHead}</tr></thead>
        <tbody><tr>{tableBody}</tr></tbody>
    </Table>;

}

const Clauses: FunctionComponent<props> = ({ text, clauses, onSelectionTypeSelect }) => {

    let clauseDisplay: ReactNode[] = [];
    clauses.forEach((clause, index) => {
        clauseDisplay.push(renderClause(text, index, clause, onSelectionTypeSelect));

    })

    return <>{clauseDisplay}</>;
}

export default Clauses;