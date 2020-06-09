import { Maybe, Nothing } from "../util/Maybe";
import { Selection } from "./Selection";
// import { Category } from "./MarkupCategory";



export type ClausePart = "mainVerb" | "verbPart" | "subject" | "accusative" | "dative" | "genitive";


export type Clause = {
    [key in ClausePart]: Maybe<Selection>;
}


export function emptyClause(): Clause {

    return {
        mainVerb: Nothing,
        verbPart: Nothing,
        subject: Nothing,
        accusative: Nothing,
        dative: Nothing,
        genitive: Nothing
    }
}

export function clauseIsEmpty(clause: Clause): boolean {

    for (let value of Object.values(clause)) {
        if (value !== Nothing) {
            return false;
        }
    }
    return true;
}

export interface SelectionType {
    clause: number,
    part: ClausePart
}


type ClausePartDisplay = {
    [key in ClausePart]: [string, string]
}


export const display: ClausePartDisplay =
{
    mainVerb: ["Verb", "lightgreen"],
    verbPart: ["Verbzusatz", "lightgreen"],
    subject: ["Subjekt", "pink"],
    accusative: ["Akkusativobjekt", "yellow"],
    dative: ["Dativbobjekt", "lightblue"],
    genitive: ["Genitivobjekt", "violet"]
}

export function mapGrammarPartToColor(part: ClausePart): string {

    return display[part][0];
}

