import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import TextSubmit from './teacher/LeadText';
import MarkupText from './teacher/MarkupText';
import { initializeClauses, SelectionType, getFirstId, updateClause, nextSelectionType } from './types/Clause';
import { Selection } from './types/Selection';
import Clauses from './teacher/Clauses';
import sentences from './teacher/SentenceExamples';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let exampleText = sentences[Math.floor(Math.random() * sentences.length)]

  const [text, setText] = useState(exampleText);

  const onTextSubmit = (text: string) => {
    setText(text);
  }


  const [clauses, setClauses] = useState(initializeClauses);

  const startingSelectionType: SelectionType = {
    clauseId: getFirstId(clauses),
    part: "subject"
  };

  const [selectionType, setSelectionType] = useState(startingSelectionType
  );

  const onSelectionTypeSelect = (type: SelectionType) => {
    setSelectionType(type);
  }


  const onSelection = (selection?: Selection) => {
    // console.log("Here is the selectionType: ", selectionType)
    if (selection !== undefined && selectionType !== undefined) {

      // console.log("Updating clauses...");

      const updatedClauses = updateClause(clauses, selectionType, selection);
      setClauses(updatedClauses);

      const nextSelection: SelectionType = nextSelectionType(selectionType, updatedClauses);
      setSelectionType(nextSelection);
      // setText("Hello there");
    }
    // console.log("Clauses", clauses);
  }


  //This is just a type placeholder.  Remove one you can convert clauses to an array of selections.
  let selections: Selection[] = [];

  return (
    <Container >
      <Row><h2 className="title">Satzanalysator</h2></Row>
      <TextSubmit initialText={text} submitFunc={onTextSubmit} />
      <MarkupText text={text}
        onSelection={onSelection}
        clauses={clauses} />
      <Clauses text={text} clauses={clauses} currentSelectionType={selectionType} onSelectionTypeSelect={onSelectionTypeSelect} />

    </Container>
  );
}

export default App;
