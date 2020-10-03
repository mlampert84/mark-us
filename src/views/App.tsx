import React, { FunctionComponent, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import TextSubmit from "./LeadText";
import MarkupText from "./MarkupText";
import Help from "./Help";
import { Selection } from "../types/Selection";
import sentences from "./SentenceExamples";
import {
  PartOfSpeech,
  addNewClause,
  Clause,
  addSelectionToClause,
  deleteSelectionFromClause,
} from "../types/Clause";
import { Maybe, Nothing } from "../util/Maybe";
import ClauseSvg from "./ClauseSvg";

const App: FunctionComponent = () => {
  const exampleText = sentences[Math.floor(Math.random() * sentences.length)];
  const [helpModal, setHelpModal] = useState(false);
  const [text, setText] = useState(exampleText);
  const [clauses, setClauses] = useState([[]] as Clause[]);
  const [selecting, setSelecting] = useState(Nothing as Maybe<Selection>);
  const [activeClause, setActiveClause] = useState(0);

  const closeModal = () => setHelpModal(false);
  const openModal = () => setHelpModal(true);

  const onTextSubmit = (newText: string) => {
    setText(newText);
    setClauses([[]]);
  };

  const onAddClause = () => setClauses(addNewClause(clauses));

  const onSelectionDelete = (index: number) => (part: PartOfSpeech) => {
    setClauses(deleteSelectionFromClause(clauses, index, part));
  };

  const onSelection = (selection: Maybe<Selection>) => {
    setSelecting(selection);
  };

  const addSelection = (pos: PartOfSpeech) => {
    setSelecting(Nothing);
    setClauses(addSelectionToClause(clauses, activeClause, pos, selecting));
  };

  const svgs = clauses.map((c, index) => {
    return (
      <ClauseSvg
        key={index.toString()}
        index={index}
        clause={c}
        text={text}
        onDelete={onSelectionDelete}
      />
    );
  });

  return (
    <div className="flexbox">
      <div className="flex-item padding">
        <Help show={helpModal} close={closeModal} />
        <Row>
          <Col>
            <h2 className="title">Satzanalysator</h2>
          </Col>
          <Col>
            <div className="help" onClick={openModal}>
              Help
            </div>
          </Col>
        </Row>
        <TextSubmit initialText={text} submitFunc={onTextSubmit} />
        <MarkupText
          text={text}
          onSelection={onSelection}
          clauses={clauses}
          selecting={selecting}
          addSelection={addSelection}
        />
      </div>
      <div className="flex-item clause-col">
        {svgs}

        <Button onClick={onAddClause}>New Clause</Button>
        {/* <div>{JSON.stringify(clauses)}</div> */}
      </div>
    </div>
  );
};

export default App;
