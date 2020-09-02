import { Maybe, Nothing } from "../util/Maybe";
import { Selection } from "./Selection";

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
    clauseId: string,
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


function genId(): string {
    return Math.random().toString(36).substring(2, 7);
};
export function initializeClauses(): Map<string, Clause> {

    let map = new Map();

    map.set(genId(), emptyClause());

    return map;

}


function hasEmptyClause(map: Map<string, Clause>): boolean {
    map.forEach((value) => {
        if (clauseIsEmpty(value)) {
            return true;
        }
    });
    return false;
}

export function getFirstId(map: Map<string, Clause>): string {
    // console.log("HEEEEELLLLOO");
    let keys = Array.from(map.keys());
    // console.log("Keys: ", keys);

    for (let k of keys) {
        // console.log("Returning first id: ", k);
        return k;
    }

    return "";
}

export function updateClause(map: Map<string, Clause>, st: SelectionType, selection: Selection): Map<string, Clause> {

    let newMap: Map<string, Clause> = cloneMap(map);

    // console.log("updating cluase with id " + st.clauseId)
    let clause = newMap.get(st.clauseId);
    if (clause !== undefined) {
        clause[st.part] = selection;
    } else {
        console.log("Could not update clause.  Id not found.");
    }

    return addOrRemoveEmptyClauses(newMap);
}


function addOrRemoveEmptyClauses(map: Map<string, Clause>): Map<string, Clause> {

    let newMap: Map<string, Clause> = new Map();


    map.forEach((value, key) => {
        console.log("Checking clause: ", JSON.stringify(value))
        console.log("Is it empty? ", clauseIsEmpty(value));
        if (!clauseIsEmpty(value)) {
            newMap.set(key, value);
        }
    })

    newMap.set(genId(), emptyClause());

    return newMap;

}

function cloneMap(map: Map<string, Clause>): Map<string, Clause> {

    let newMap: Map<string, Clause> = new Map();

    map.forEach((value, key) => {

        newMap.set(key, value);
    });

    return newMap;
}