import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import Menu, { MenuPosition } from "./PartOfSpeechMenu";
import { Selection, fitToWord } from "../types/Selection";
import { Clause, PartOfSpeech } from "../types/Clause";
import { clausesToCuts, selectionToCuts, cutComparator } from "../types/Cuts";
import { Maybe, Nothing } from "../util/Maybe";

type props = {
  text: string;
  clauses: Clause[];
  onSelection: (selection: Maybe<Selection>) => void;
  selecting: Maybe<Selection>;
  addSelection: (pos: PartOfSpeech) => void;
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
      const begin =
        parseInt(range.startContainer.parentElement.id.split("-")[1], 10) +
        range.startOffset;
      const end =
        parseInt(range.endContainer.parentElement.id.split("-")[1], 10) +
        range.endOffset;

      const editedRange: [number, number] | null = fitToWord(text, begin, end);

      if (editedRange === null) {
        return null;
      }

      const selection: Selection = {
        begin: editedRange[0],
        end: editedRange[1],
      };
      return selection;
    }
    return null;
  }

  return null;
}

const MarkUp: FunctionComponent<props> = ({
  text,
  clauses,
  onSelection,
  selecting,
  addSelection,
}: props) => {
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
  } as MenuPosition);

  const menuRef = useRef<HTMLUListElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  // TODO: Move this part to a separate function?
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside: { (event: globalThis.MouseEvent): void } = (
      event: globalThis.MouseEvent
    ) => {
      if (
        pRef.current &&
        menuRef.current &&
        !pRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onSelection(Nothing);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pRef, menuRef, onSelection]);

  const checkSelection = (event: React.MouseEvent) => {
    const selection = makeSelection(text);
    if (selection !== null) {
      setMenuPosition({
        x: event.clientX,
        y: event.clientY,
      });
      onSelection(selection);
    }
  };

  // TODO: implement clausesToSelectionsFunction
  const cuts = clausesToCuts(clauses);

  if (selecting !== Nothing) {
    cuts.push(...selectionToCuts(selecting, "black", "yellow"));
  }

  cuts.sort(cutComparator);

  console.log("Cuts from markup:", cuts);
  const displaySelections: any = [];

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

  for (let i = 0; i <= cuts.length - 2; i += 1) {
    let style;
    if (cuts[i].type === "start") {
      style = {
        backgroundColor: cuts[i].backgroundColor,
        color: cuts[i].textColor,
      };
    }

    displaySelections.push(
      <span
        key={cuts[i].type + i}
        id={`start-${cuts[i].index}`}
        // Figure out how to handle color of overlapping selections.
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
        <p
          onMouseUp={checkSelection}
          id="text-root"
          className="markup-text"
          ref={pRef}
        >
          {displaySelections}
        </p>
        {selecting !== Nothing && (
          <Menu
            position={menuPosition}
            addSelection={addSelection}
            ref={menuRef}
          />
        )}
      </Jumbotron>
    </>
  );
};

export default MarkUp;
