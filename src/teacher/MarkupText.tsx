import React, { FunctionComponent } from "react";
import { Selection, selectionToCuts } from "../types/Selection";
import { Category, cssBackgroundColor, grammarCategories } from "../types/MarkupCategory"
type props = {
  text: string;
  selections: Selection[];
  onSelection: (selection?: Selection) => void;
};

function makeSelection(): null | Selection {
  console.log(window.getSelection());

  const range = window.getSelection()?.getRangeAt(0);
  window.getSelection()?.removeAllRanges();
  console.log("Range:", range);
  if (range !== undefined) {
    if (
      range.startContainer?.parentElement?.id?.includes("start") &&
      range.endContainer?.parentElement?.id?.includes("start")
    ) {
      const selection: Selection = {
        id: Math.random().toString(36).substring(2, 7),
        category: "Subjekt",
        begin:
          parseInt(range.startContainer.parentElement.id.split("-")[1]) +
          range.startOffset,
        end:
          parseInt(range.endContainer.parentElement.id.split("-")[1]) +
          range.endOffset,
      };
      return selection;
    }
    return null;
  }

  return null;
}

const MarkUp: FunctionComponent<props> = ({ text, selections, onSelection }) => {
  let checkSelection = () => {
    let selection = makeSelection();
    if (selection !== null) {
      onSelection(selection)
    }

  };

  let cuts = selectionToCuts(selections);
  console.log("Cuts:", cuts);
  let displaySelections: any = [];

  let firstSpanEnd = text.length;
  let lastSpanStart = text.length;

  if (cuts.length > 0) {
    firstSpanEnd = cuts[0].index;
    lastSpanStart = cuts[cuts.length - 1].index;
  }

  displaySelections.push(
    <span key="start" id="start-0">
      {text.slice(0, firstSpanEnd)}
    </span>
  );
  let activeIds: string[] = [];
  let activeCategories: Category[] = [];

  for (let i = 0; i <= cuts.length - 2; i++) {
    if (cuts[i].type === "start") {
      activeIds.push(cuts[i].id);
      activeCategories.push(cuts[i].category)
    }
    if (cuts[i].type === "end") {
      activeIds.splice(activeIds.indexOf(cuts[i].id), 1);
      activeCategories.splice(activeCategories.indexOf(cuts[i].category), 1);

    }

    let classes = activeIds.join(" ");

    displaySelections.push(
      <span
        key={cuts[i].id + cuts[i].type}
        className={classes}
        id={"start-" + cuts[i].index}
        style={{ backgroundColor: cssBackgroundColor(grammarCategories, activeCategories[0]) }}

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
      <p onMouseUp={checkSelection} id="text-root">
        {displaySelections}
      </p>
    </>
  );
};

export default MarkUp;
