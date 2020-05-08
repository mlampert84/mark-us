import React, { useState } from 'react';
import './App.css';
import TextSubmit from './teacher/LeadText';
import MarkupText from './teacher/MarkupText';

function App() {

  let practiceText = "The quick brown fox jumped over the fence. The little dog laughed.  I went to the store."

  const [text, setText] = useState(practiceText);

  const onTextSubmit = (text: string) => {
    setText(text);
  }



  interface SelectionType {
    name: string;
    color: string;
  };

  let selectionTypes: SelectionType[] = [{ name: "subjekt", color: "red" }, { name: "verb", color: "blue" }]

  interface Selection {
    type: SelectionType;
    begin: Number;
    end: Number;
  }

  let selections: Selection[];


  return (
    <div >
      <TextSubmit initialText={practiceText} submitFunc={onTextSubmit} />
      <MarkupText text={text} />
    </div>
  );
}

export default App;
