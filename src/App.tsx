import React, { useState } from 'react';
import './App.css';
import TextSubmit from './teacher/LeadText';
import MarkupText from './teacher/MarkupText';
import { Selection } from './types/Selection';
import { Category, grammarCategories, CategoryColor } from './types/MarkupCategory';
import CategoryMenu from './teacher/CategoryMenu';

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


  const [category, setCategory] = useState("Subjekt");

  const onCategorySelect = (category: Category) => {
    setCategory(category);
  }

  return (
    <div >
      <TextSubmit initialText={practiceText} submitFunc={onTextSubmit} />
      <MarkupText text={text}
        selections={selections} onSelection={onSelection}
        category={category} />
      <CategoryMenu category={category} onCategorySelect={onCategorySelect} />

    </div>
  );
}

export default App;
