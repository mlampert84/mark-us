import { Maybe, Nothing } from "../util/Maybe";
import { Selection } from "./Selection";
import Clauses from "../teacher/Clauses";
// import { Category } from "./MarkupCategory";



// let clauseParts : string[] = ["mainVerb" , "verbPart" , "subject", "accusative" , "dative" , "genitive"];

export type Clause = {
    [key in ClausePart]: Maybe<Selection>;
}


// export class Clause {
//     [key: string]: Maybe<Selection>;
//     "mainVerb": Maybe<Selection>;
//     "verbPart": Maybe<Selection>;
//     "subject": Maybe<Selection>;
//     "accusative": Maybe<Selection>;
//     "dative": Maybe<Selection>;
//     "genitive": Maybe<Selection>;
// }

export function emptyClause(): Clause {

    const clause = new Clause();

    Object.keys(clause).forEach((key: string) => {
        clause[key] = Nothing;
    });

    return clause;
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

    return display[part][1];
}

// id: Math.random().toString(36).substring(2, 7),
