import React, { useState } from 'react';
import './App.css';
import TextSubmit from './teacher/LeadText';
import MarkupText from './teacher/MarkupText';
import { Selection, SelectionType } from './types/Selection';

function addSelection(addition: Selection, existing: Selection[]) {
  let insertIndex = 0;

  for (let s of existing) {
    if (addition.begin > s.begin) {
      insertIndex++;
    }
    else {
      break;
    }
  }

  return [...existing.slice(0, insertIndex), addition, ...existing.slice(insertIndex, existing.length)];
}

function App() {

  let practiceText = "The quick brown fox jumped over the fence. The little dog laughed.  I went to the store."

  const [text, setText] = useState(practiceText);

  const onTextSubmit = (text: string) => {
    setText(text);
  }

  const [selections, setSelections] = useState([] as Selection[]);

  const onSelection = (selection?: Selection) => {
    if (selection !== undefined) {
      setSelections(oldSelections => addSelection(selection, oldSelections));
    }
    console.log("Selections", selections);
  }

  let selectionTypes: SelectionType[] = [{ name: "subjekt", color: "red" }, { name: "verb", color: "blue" }]




  return (
    <div >
      <TextSubmit initialText={practiceText} submitFunc={onTextSubmit} />
      <MarkupText text={text} selections={selections} onSelection={onSelection} />
    </div>
  );
}

export default App;
