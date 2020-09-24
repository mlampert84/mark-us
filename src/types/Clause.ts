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


//TODO: Change to Maybe SelectionType
export function nextSelectionType(
    current: SelectionType,
    clauses: Map<string, Clause>): SelectionType {

    if (current.part === "subject") {
        return {
            clauseId: current.clauseId,
            part: "mainVerb"
        }
    }

    //TODO: This is a nothing value
    return {
        clauseId: "",
        part: "mainVerb"
    }
}

type ClausePartDisplay = {
    [key in ClausePart]: [string, string]
}


export const display: ClausePartDisplay =
{
    mainVerb: ["Verb", "#872154"],
    verbPart: ["Verbzusatz", "#aa4399"],
    subject: ["Subjekt", "#44aa99"],
    predicate: ["Prädikatsnomen", "#87ccee"],
    accusative: ["Akkusativobjekt", "#217733"],
    dative: ["Dativbobjekt", "#332288"],
    genitive: ["Genitivobjekt", "#ddcc76"],
    reflexive: ["Reflexivpronomen", "#999932"]
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


export function getFirstId(map: Map<string, Clause>): string {
    let keys = Array.from(map.keys());

    for (let k of keys) {
        return k;
    }

    return "";
}

export function updateClause(map: Map<string, Clause>, st: SelectionType, selection: Selection): Map<string, Clause> {

    let newMap: Map<string, Clause> = cloneMap(map);

    let clause = newMap.get(st.clauseId);
    if (clause !== undefined) {
        clause[st.part] = selection;
    } else {
        console.log("Could not update clause.  Id not found.");
    }

    return removeEmptyClauses(newMap);
}



export function deleteClausePart(id: string, part: ClausePart, clauses: Map<string, Clause>): Map<string, Clause> {

    let newMap: Map<string, Clause> = cloneMap(clauses);

    for (let [key, value] of clauses) {

        if (key === id) {
            value[part] = Nothing;
            break;
        }
    }

    return newMap;
}



function removeEmptyClauses(map: Map<string, Clause>): Map<string, Clause> {

    let newMap: Map<string, Clause> = new Map();


    map.forEach((value, key) => {
        console.log("Checking clause: ", JSON.stringify(value))
        console.log("Is it empty? ", clauseIsEmpty(value));
        if (!clauseIsEmpty(value)) {
            newMap.set(key, value);
        }
    })

    // newMap.set(genId(), emptyClause());

    return newMap;

}

export function addClause(map: Map<string, Clause>): Map<string, Clause> {
    let newMap = cloneMap(map);
    newMap.set(genId(), emptyClause());

    return newMap
}

function cloneMap(map: Map<string, Clause>): Map<string, Clause> {

    let newMap: Map<string, Clause> = new Map();

    map.forEach((value, key) => {

        newMap.set(key, value);
    });

    return newMap;
}