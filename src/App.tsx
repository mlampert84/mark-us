import React, { useState } from 'react';
import './App.css';
import TextSubmit from './teacher/LeadText';
import MarkupText from './teacher/MarkupText';
import { Selection } from './types/Selection';

function App() {

  let practiceText = "The quick brown fox jumped over the fence. The little dog laughed.  I went to the store."

  const [text, setText] = useState(practiceText);

  const onTextSubmit = (text: string) => {
    setText(text);
  }

  const [selections, setSelections] = useState([] as Selection[]);

  const onSelection = (selection?: Selection) => {
    if (selection !== undefined) {
      setSelections((oldSelections: Selection[]) => [...oldSelections, selection]);
    }
    console.log("Selections", selections);
  }


  return (
    <div >
      <TextSubmit initialText={practiceText} submitFunc={onTextSubmit} />
      <MarkupText text={text} selections={selections} onSelection={onSelection} />
    </div>
  );
}

export default App;
