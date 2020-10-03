import React, { FunctionComponent } from "react";
import { Clause, getDisplayName, PartOfSpeech } from "../types/Clause";
import { Nothing } from "../util/Maybe";
import { OrderedClause, toOrderedClause } from "../types/OrderedClause";
import SVGText from "./SVGText";

type Props = {
  index: number;
  clause: Clause;
  text: string;
  active: boolean;
  onSelectClause: (index: number) => void;
  onDeleteClause: (index: number) => void;
  onDeleteSelection: (index: number) => (part: PartOfSpeech) => void;
};

const selectionsStartY = 70;
const outerMargin = 1;
const innerMargin = 2;

const numberOfElements = 5;

const elementWidth: number =
  (100 - (numberOfElements - 1) * innerMargin - 2 * outerMargin) /
  numberOfElements;

function textStartX(index: number) {
  return outerMargin + index * (innerMargin + elementWidth);
}

function lineEndX(index: number) {
  return textStartX(index) + elementWidth / 2;
}

function verticalLine(index: number, startingHeight: number) {
  const x = `${lineEndX(index)}%`;

  return (
    <line
      key={`${index}-vertical-line`}
      x1={x}
      y1={`${startingHeight}%`}
      x2={x}
      y2={`${selectionsStartY}%`}
      stroke="black"
      strokeWidth="2"
      strokeDasharray="6,3"
    />
  );
}

function branchLine(x1: number, y1: number, x2: number) {
  return (
    <line
      key={`${x1}branch-line`}
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2="40%"
      strokeWidth="4"
      stroke="black"
    />
  );
}

function branch(index: number, name: string) {
  const treeTopX: number = textStartX(1) + elementWidth / 2;
  const treeTopY = 10;

  switch (index) {
    case 0:
    case 2:
    case 3:
    case 4:
      return [
        verticalLine(index, 50),
        <text
          key={`${index}branch`}
          x={`${lineEndX(index)}%`}
          y="45%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {name}
        </text>,
        branchLine(treeTopX, treeTopY, textStartX(index) + elementWidth / 2),
      ];
    case 1:
      return [
        verticalLine(index, 10),
        <text
          key={`${index}branch`}
          x={`${lineEndX(index)}%`}
          y="5%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {name}
        </text>,
      ];
    default:
      return [];
  }
}

function mapClauseToTree(clause: OrderedClause): JSX.Element[][] {
  const svgElements: JSX.Element[][] = [];

  svgElements.push(branch(0, getDisplayName("subject")));
  svgElements.push(branch(1, getDisplayName("mainVerb")));

  for (let i = 2; i < clause.length; i += 1) {
    const grammarPart = clause[i];
    if (grammarPart !== Nothing) {
      svgElements.push(branch(i, getDisplayName(grammarPart.partOfSpeech)));
    }
  }
  return svgElements;
}

function mapClauseToTextDivs(
  clause: OrderedClause,
  onDelete: (p: PartOfSpeech) => void
) {
  const textFields: React.ReactElement[] = [];

  clause.forEach((el, index) => {
    if (el !== Nothing) {
      textFields.push(
        <SVGText
          key={el.partOfSpeech}
          width={elementWidth}
          height={80}
          x={textStartX(index)}
          y={selectionsStartY}
          text={el.text}
          pos={el.partOfSpeech}
          onDelete={onDelete}
        />
      );
    }
  });

  return textFields;
}

const ClauseSvg: FunctionComponent<Props> = ({
  index,
  clause,
  text,
  active,
  onSelectClause,
  onDeleteClause,
  onDeleteSelection,
}: Props) => {
  const orderedClause: OrderedClause = toOrderedClause(clause, text);

  const activeStyling = active ? "svgActive" : "svgNotActive";

  return (
    <div className="svgWrapper">
      <span
        className="closeButton"
        onClick={() => {
          onDeleteClause(index);
        }}
      >
        &times;
      </span>
      <svg
        className={`svg ${activeStyling}`}
        key={index}
        onClick={() => onSelectClause(index)}
      >
        {mapClauseToTree(orderedClause)}
        {mapClauseToTextDivs(orderedClause, onDeleteSelection(index))}
      </svg>
    </div>
  );
};

export default ClauseSvg;
