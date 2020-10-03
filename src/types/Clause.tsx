import { Selection } from "./Selection";
import { Maybe, Nothing } from "../util/Maybe";

export interface GrammarSelection {
  partOfSpeech: PartOfSpeech;
  selection: Selection;
}

export interface GrammarText {
  partOfSpeech: PartOfSpeech;
  text: string;
}

export type Clause = GrammarSelection[];

export function addSelectionToClause(
  clauses: Clause[],
  index: number,
  partOfSpeech: PartOfSpeech,
  selection: Maybe<Selection>
): Clause[] {
  if (selection === Nothing) {
    return clauses;
  }

  const copy = clauses.slice();

  const filteredArray = copy[index].filter(
    (x) => x.partOfSpeech !== partOfSpeech
  );

  filteredArray.push({
    partOfSpeech,
    selection,
  });

  copy[index] = filteredArray;
  return copy;
}

export function deleteSelectionFromClause(
  clauses: Clause[],
  clauseIndex: number,
  partOfSpeech: PartOfSpeech
): Clause[] {
  const copy = clauses.slice();
  const index = copy[clauseIndex].findIndex(
    (p) => p.partOfSpeech === partOfSpeech
  );
  if (index > -1) {
    copy[clauseIndex].splice(index, 1);
  }

  return copy;
}

export function addNewClause(clauses: Clause[]): Clause[] {
  const copy = clauses.slice();
  copy.push([]);
  return copy;
}

export type PartOfSpeech =
  | "subject"
  | "mainVerb"
  | "verbPart"
  | "accusative"
  | "dative"
  | "genitive"
  | "reflexive"
  | "predicate";

interface ClausePart {
  partOfSpeech: PartOfSpeech;
  displayName: string;
  color: string;
}

export const parts: ClausePart[] = [
  {
    partOfSpeech: "subject",
    displayName: "Subjekt",
    color: "#44aa99",
  },
  {
    partOfSpeech: "mainVerb",
    displayName: "Verb",
    color: "#872154",
  },
  {
    partOfSpeech: "verbPart",
    displayName: "Verbzusatz",
    color: "#aa4399",
  },
  {
    partOfSpeech: "accusative",
    displayName: "Akkusativobjekt",
    color: "#217733",
  },
  {
    partOfSpeech: "dative",
    displayName: "Dativobjekt",
    color: "#332288",
  },
  {
    partOfSpeech: "reflexive",
    displayName: "Reflexivpronomen",
    color: "#999932",
  },
  {
    partOfSpeech: "genitive",
    displayName: "Genitivobjek",
    color: "#ddcc76",
  },
  {
    partOfSpeech: "predicate",
    displayName: "Prädikatsnomen",
    color: "#87ccee",
  },
];

export function isPartOfSpeech(s: string): boolean {
  const partsOfSpeech: string[] = parts.map((p) => p.partOfSpeech);
  return partsOfSpeech.includes(s);
}

const colorMap: Map<PartOfSpeech, string> = new Map();
parts.forEach((p) => colorMap.set(p.partOfSpeech, p.color));

export function partOfSpeechToColor(partOfSpeech: PartOfSpeech): string {
  const color = colorMap.get(partOfSpeech);

  return color === undefined ? "" : color;
}

const displayNameMap: Map<PartOfSpeech, string> = new Map();
parts.forEach((p) => displayNameMap.set(p.partOfSpeech, p.displayName));

export function getDisplayName(partOfSpeech: PartOfSpeech): string {
  const name = displayNameMap.get(partOfSpeech);
  return name === undefined ? "" : name;
}
