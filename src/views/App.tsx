import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import TextSubmit from './LeadText';
import MarkupText from './MarkupText';
import Help from './Help';
import { ClausePart, initializeClauses, SelectionType, getFirstId, updateClause, nextSelectionType, deleteClausePart, addClause } from '../types/Clause';
import { Selection } from '../types/Selection';
import Clauses from './Clauses';
import sentences from './SentenceExamples';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {



  const [helpModal, setHelpModal] = useState(false);

  const closeModal = () => setHelpModal(false);
  const openModal = () => setHelpModal(true);


  let exampleText = sentences[Math.floor(Math.random() * sentences.length)]

  const [text, setText] = useState(exampleText);

  const onTextSubmit = (text: string) => {
    setText(text);
    setClauses(initializeClauses);
  }


  const [clauses, setClauses] = useState(initializeClauses);


  const onAddClause = () => setClauses(addClause(clauses));


  const startingSelectionType: SelectionType = {
    clauseId: getFirstId(clauses),
    part: "subject"
  };

  const [selectionType, setSelectionType] = useState(startingSelectionType
  );

  const onSelectionTypeSelect = (type: SelectionType) => {
    setSelectionType(type);
  }

  const onSelectionDelete = (id: string, part: ClausePart) => {
    setClauses(deleteClausePart(id, part, clauses));
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


  return (
    <div className="flexbox">
      <div className="flex-item padding">
        <Help show={helpModal}
          close={closeModal}
        />
        {/* <Container > */}
        <Row>
          <Col>
            <h2 className="title">Satzanalysator</h2>

          </Col>
          <Col>
            <div className="help" onClick={openModal}>Help</div>

          </Col>
        </Row>
        <TextSubmit initialText={text} submitFunc={onTextSubmit} />
        <MarkupText text={text}
          onSelection={onSelection}
          clauses={clauses} />
        {/* </Container> */}
      </div>
      <div className="flex-item clause-col">

        <Clauses
          text={text}
          clauses={clauses}
          selecting={selectionType}
          onSelectionTypeSelect={onSelectionTypeSelect}
          onSelectionDelete={onSelectionDelete} />

        <Button onClick={onAddClause}>New Clause</Button>
      </div>

    </div>
  );
}

export default App;
