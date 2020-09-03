import { Maybe, Nothing } from "../util/Maybe";
import { Selection } from "./Selection";

export type ClausePart =
    "subject" |
    "mainVerb" |
    "verbPart" |
    "accusative" |
    "dative" |
    "genitive" |
    "reflexive" |
    "predicate";


export type Clause = {
    [key in ClausePart]: Maybe<Selection>;
}


export function emptyClause(): Clause {

    return {
        subject: Nothing,
        mainVerb: Nothing,
        verbPart: Nothing,
        accusative: Nothing,
        dative: Nothing,
        genitive: Nothing,
        reflexive: Nothing,
        predicate: Nothing

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

//TODO: THis function does not work properly.
export function nextSelectionType(current: SelectionType,
    clauses: Map<string, Clause>): SelectionType {

    if (current.part === "subject") {
        return {
            clauseId: current.clauseId,
            part: "mainVerb"
        }
    }
    else {
        return {
            clauseId: findEmptyClause(clauses),
            part: "subject"
        }
    }


}

function findEmptyClause(clauses: Map<string, Clause>): string {

    clauses.forEach((value, key) => {
        if (clauseIsEmpty(value)) {
            return key;
        }
    });

    return "";


}

type ClausePartDisplay = {
    [key in ClausePart]: [string, string]
}


export const display: ClausePartDisplay =
{
    mainVerb: ["Verb", "red"],
    verbPart: ["Verbzusatz", "red"],
    subject: ["Subjekt", "blue"],
    predicate: ["Prädikatsnomen", "blue"],
    accusative: ["Akkusativobjekt", "green"],
    dative: ["Dativbobjekt", "purple"],
    genitive: ["Genitivobjekt", "orange"],
    reflexive: ["Reflexivpronomen", "blue"]
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