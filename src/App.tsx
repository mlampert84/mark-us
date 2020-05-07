import React, { useState } from 'react';
import './App.css';
import TextSubmit from './teacher/LeadText';
import MarkupText from './teacher/MarkupText';

function App() {

  const [text, setText] = useState("");

  const onTextSubmit = (text: string) => {
    setText(text);
  }


  return (
    <div >
      <TextSubmit initialText="howdy!" submitFunc={onTextSubmit} />
      <MarkupText text={text} />
    </div>
  );
}

export default App;
