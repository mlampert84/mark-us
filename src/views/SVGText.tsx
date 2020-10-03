import React, { FunctionComponent } from "react";
import { PartOfSpeech, partOfSpeechToColor } from "../types/Clause";

export type SVGTextProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  pos: PartOfSpeech;
  onDelete: (p: PartOfSpeech) => void;
};

const SVGText: FunctionComponent<SVGTextProps> = ({
  x,
  y,
  width,
  height,
  text,
  pos,
  onDelete,
}: SVGTextProps) => {
  const divColor = {
    backgroundColor: partOfSpeechToColor(pos),
  };

  return (
    <foreignObject
      x={`${x}%`}
      y={`${y}%`}
      width={`${width}%`}
      height={`${height}px`}
    >
      <div style={divColor} className="svgTextTopHack">
        <span
          className="closeButton"
          onClick={() => {
            onDelete(pos);
          }}
        >
          &times;
        </span>
      </div>
      <div style={divColor} className="svgText">
        {text}
      </div>
    </foreignObject>
  );
};

export default SVGText;
