import React, { useState } from 'react';
import './App.css';
import TextSubmit from './teacher/LeadText';
import MarkupText from './teacher/MarkupText';
import { initializeClauses, SelectionType, getFirstId, updateClause } from './types/Clause';
import { Selection } from './types/Selection';
import Clauses from './teacher/Clauses';
// import { Cut, clausesToCuts } from './types/Cuts';

function App() {

  let practiceText = "The quick brown fox jumped over the fence. The little dog laughed.  I went to the store."

  const [text, setText] = useState(practiceText);

  const onTextSubmit = (text: string) => {
    setText(text);
  }


  const [clauses, setClauses] = useState(initializeClauses);

  const initialSelection = getFirstId(clauses);
  console.log("InitialSelection", initialSelection);
  const [selectionType, setSelectionType] = useState<SelectionType | undefined>(
    {
      clauseId: getFirstId(clauses),
      part: "mainVerb"
    }
  );

  const onSelectionTypeSelect = (type: SelectionType) => {
    setSelectionType(type);
  }


  const onSelection = (selection?: Selection) => {
    // console.log("Here is the selectionType: ", selectionType)
    if (selection !== undefined && selectionType !== undefined) {

      console.log("Updating clauses...");
      setClauses(updateClause(clauses, selectionType, selection));
      // setText("Hello there");
    }
    console.log("Clauses", clauses);
  }


  //This is just a type placeholder.  Remove one you can convert clauses to an array of selections.
  let selections: Selection[] = [];

  return (
    <div >
      <TextSubmit initialText={practiceText} submitFunc={onTextSubmit} />
      <MarkupText text={text}
        onSelection={onSelection}
        clauses={clauses} />
      <Clauses text={text} clauses={clauses} onSelectionTypeSelect={onSelectionTypeSelect} />

    </div>
  );
}

export default App;
