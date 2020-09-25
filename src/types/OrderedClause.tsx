import { GrammarText, Clause, PartOfSpeech } from "./Clause";
import { Maybe, toMaybe, Nothing } from "../util/Maybe";

export type OrderedClause = Maybe<GrammarText>[];

const pronouns = [
  "mich",
  "dich",
  "ihn",
  "sie",
  "es",
  "uns",
  "euch",
  "mir",
  "dir",
  "ihm",
  "ihr",
];

function isPronoun(word: string): boolean {
  return pronouns.includes(word);
}

function addIfPresent(
  unordered: GrammarText[],
  ordered: OrderedClause,
  pos: PartOfSpeech
): void {
  const maybe: Maybe<GrammarText> = toMaybe(
    unordered.find((p) => p.partOfSpeech === pos)
  );

  if (maybe !== Nothing) {
    ordered.push(maybe);
  }
}

function addGrammarTextIfPresent(
  ordered: OrderedClause,
  element: Maybe<GrammarText>
): void {
  if (element !== Nothing) {
    ordered.push(element);
  }
}

export function toOrderedClause(clause: Clause, text: string): OrderedClause {
  const unordered: GrammarText[] = clause.map((p) => {
    return {
      partOfSpeech: p.partOfSpeech,
      text: text.substring(p.selection.begin, p.selection.end),
    };
  });

  const ordered: OrderedClause = [];

  ordered.push(toMaybe(unordered.find((p) => p.partOfSpeech === "subject")));

  ordered.push(toMaybe(unordered.find((p) => p.partOfSpeech === "mainVerb")));

  addIfPresent(unordered, ordered, "predicate");

  addIfPresent(unordered, ordered, "reflexive");

  const acc: Maybe<GrammarText> = toMaybe(
    unordered.find((p) => p.partOfSpeech === "accusative")
  );

  const dat: Maybe<GrammarText> = toMaybe(
    unordered.find((p) => p.partOfSpeech === "dative")
  );

  if (acc !== Nothing && isPronoun(acc.text)) {
    ordered.push(acc);
    addGrammarTextIfPresent(ordered, dat);
  } else {
    addGrammarTextIfPresent(ordered, dat);
    addGrammarTextIfPresent(ordered, acc);
  }

  addIfPresent(unordered, ordered, "genitive");

  addIfPresent(unordered, ordered, "verbPart");
  return ordered;
}
