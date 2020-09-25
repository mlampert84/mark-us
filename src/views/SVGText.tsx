import React, { FunctionComponent } from "react";
import { PartOfSpeech, partOfSpeechToColor } from "../types/Clause";

export type SVGTextProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  pos: PartOfSpeech;
};

const SVGText: FunctionComponent<SVGTextProps> = ({
  x,
  y,
  width,
  height,
  text,
  pos,
}: SVGTextProps) => {
  const divStyle = {
    backgroundColor: partOfSpeechToColor(pos),
  };

  return (
    <foreignObject
      x={`${x}%`}
      y={`${y}%`}
      width={`${width}%`}
      height={`${height}%`}
    >
      <div style={divStyle} className="svgText">
        {text}
      </div>
    </foreignObject>
  );
};

export default SVGText;
