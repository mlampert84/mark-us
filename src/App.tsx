import React, { useState } from 'react';
import './App.css';
import TextSubmit from './teacher/LeadText';
import MarkupText from './teacher/MarkupText';
import { emptyClause, Clause, ClausePart, SelectionType } from './types/Clause';
import { Selection } from './types/Selection';
import Clauses from './teacher/Clauses';

function App() {

  let practiceText = "The quick brown fox jumped over the fence. The little dog laughed.  I went to the store."

  const [text, setText] = useState(practiceText);

  const onTextSubmit = (text: string) => {
    setText(text);
  }



  const [clauses, setClauses] = useState([emptyClause()]);

  const [selectionType, setSelectionType] = useState<SelectionType | undefined>(
    {
      clause: 0,
      part: "mainVerb"
    }
  );

  const onSelectionTypeSelect = (type: SelectionType) => {
    setSelectionType(type);
  }


  const onSelection = (selection?: Selection) => {
    if (selection !== undefined && selectionType !== undefined) {

      console.log("SelectionType being updated:", selectionType.part);
      setClauses((oldClauses: Clause[]) => {
        let newClauses = [...oldClauses];
        newClauses[selectionType.clause][selectionType.part] = selection;
        return newClauses;
      })
    }
    console.log("Clauses", clauses);
  }

  //This is just a type placeholder.  Remove one you can convert clauses to an array of selections.
  let selections: Selection[] = [];

  return (
    <div >
      <TextSubmit initialText={practiceText} submitFunc={onTextSubmit} />
      <MarkupText text={text}
        selections={selections} onSelection={onSelection}
        clauses={clauses} />
      <Clauses text={text} clauses={clauses} onSelectionTypeSelect={onSelectionTypeSelect} />

    </div>
  );
}

export default App;
