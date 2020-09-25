import { partOfSpeechToColor, Clause } from "./Clause";
import { Selection } from "./Selection";

export interface Cut {
  type: "start" | "end";
  index: number;
  textColor: string;
  backgroundColor: string;
}

export function selectionToCuts(
  selection: Selection,
  textColor: string,
  backgroundColor: string
): Cut[] {
  const cuts: Cut[] = [];
  cuts.push({
    type: "start",
    index: selection.begin,
    textColor,
    backgroundColor,
  });

  cuts.push({
    type: "end",
    index: selection.end,
    textColor,
    backgroundColor,
  });

  return cuts;
}

export function clauseToCuts(clause: Clause): Cut[] {
  return clause.flatMap((pos) => {
    return selectionToCuts(
      pos.selection,
      "white",
      partOfSpeechToColor(pos.partOfSpeech)
    );
  });
}

export function cutComparator(a: Cut, b: Cut): -1 | 0 | 1 {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }

  if (a.type === "start" && b.type === "end") {
    return -1;
  }
  if (a.type === "end" && b.type === "start") {
    return 1;
  }
  return 0;
}

export function clausesToCuts(clauses: Clause[]): Cut[] {
  const cuts: Cut[] = clauses.flatMap((c) => clauseToCuts(c));

  // console.log("Cuts from all clauses:", JSON.stringify(cuts));
  return cuts;
}
