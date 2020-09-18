import React, { FunctionComponent } from "react";
import { Selection, fitToWord } from "../types/Selection";
import { Clause } from "../types/Clause";
import { clausesToCuts } from "../types/Cuts";
import { Jumbotron } from 'react-bootstrap';


type props = {
  text: string;
  clauses: Map<string, Clause>;
  onSelection: (selection?: Selection) => void;
};

function makeSelection(text: string): null | Selection {
  // console.log(window.getSelection());

  const range = window.getSelection()?.getRangeAt(0);
  window.getSelection()?.removeAllRanges();
  // console.log("Range:", range);
  if (range !== undefined) {
    if (
      range.startContainer?.parentElement?.id?.includes("start") &&
      range.endContainer?.parentElement?.id?.includes("start")
    ) {

      const begin = parseInt(range.startContainer.parentElement.id.split("-")[1]) + range.startOffset;
      const end = parseInt(range.endContainer.parentElement.id.split("-")[1]) + range.endOffset;

      const editedRange: [number, number] | null = fitToWord(text, begin, end);

      if (editedRange === null) {
        return null;
      }

      const selection: Selection = {
        begin: editedRange[0],
        end: editedRange[1]

      };
      return selection;
    }
    return null;
  }

  return null;
}

const MarkUp: FunctionComponent<props> = ({ text, clauses, onSelection }) => {

  // console.log("Rerendering markup.");
  let checkSelection = () => {
    let selection = makeSelection(text);
    if (selection !== null) {
      onSelection(selection)
    }

  };

  //TODO: implement clausesToSelectionsFunction
  let cuts = clausesToCuts(clauses);
  // console.log("Cuts from markup:", cuts);
  let displaySelections: any = [];

  let firstSpanEnd = text.length;
  let lastSpanStart = text.length;

  if (cuts.length > 0) {
    firstSpanEnd = cuts[0].index;
    lastSpanStart = cuts[cuts.length - 1].index;
  }

  displaySelections.push(
    <span
      key="start"
      id="start-0">
      {text.slice(0, firstSpanEnd)}
    </span>
  );
  let activeIds: string[] = [];

  for (let i = 0; i <= cuts.length - 2; i++) {
    let style;
    if (cuts[i].type === "start") {
      activeIds.push(cuts[i].id);
      style = { backgroundColor: cuts[i].color }
    }
    if (cuts[i].type === "end") {
      activeIds.splice(activeIds.indexOf(cuts[i].id), 1);
    }



    let classes = activeIds.join(" ");

    if (activeIds.length > 0) {
      classes += ", selection";
    }

    displaySelections.push(
      <span
        key={cuts[i].id + cuts[i].type + cuts[i].color + i}
        className={classes}
        id={"start-" + cuts[i].index}
        //Figure out how to handle color of overlapping selections.
        style={style}
      >
        {text.slice(cuts[i].index, cuts[i + 1].index)}
      </span>
    );
  }

  displaySelections.push(
    <span key="end" id={"start-" + lastSpanStart}>
      {text.slice(lastSpanStart, text.length)}
    </span>
  );

  return (
    <>
      <Jumbotron>
        <p onMouseUp={checkSelection} id="text-root" className="markup-text">
          {displaySelections}
        </p>
      </Jumbotron>
    </>
  );
};

export default MarkUp;