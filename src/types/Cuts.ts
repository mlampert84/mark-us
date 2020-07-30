import { Clause, mapGrammarPartToColor } from "./Clause";
import { Nothing } from "../util/Maybe";

export interface Cut {
    id: string;
    type: "start" | "end";
    index: number;
    color: string;
}



export function clauseToCuts(clause: Clause, clauseId: string): Cut[] {
    let cuts: Cut[] = [];

    let key: keyof Clause;

    for (key in clause) {

        const part = clause[key];
        const color: string = mapGrammarPartToColor(key);

        if (part !== Nothing) {

            const startCut: Cut = {
                id: clauseId,
                type: "start",
                index: part.begin,
                color: color
            }

            const endCut: Cut = {
                id: clauseId,
                type: "end",
                index: part.end,
                color: color

            }

            cuts.push(startCut, endCut);


        }
    }
    console.log("Cuts: " + JSON.stringify(cuts));
    return cuts;

}

export function clausesToCuts(clauses: Map<string, Clause>): Cut[] {

    let cuts: Cut[] = [];

    clauses.forEach((c, id) => {
        cuts.push(...clauseToCuts(c, id));
    });

    cuts.sort(cutComparator);
    console.log("Cuts from all clauses:", JSON.stringify(cuts));
    return cuts;
}

function cutComparator(a: Cut, b: Cut): -1 | 0 | 1 {
    if (a.index < b.index) {
        return -1;
    }

    else if (a.index > b.index) {
        return 1;
    }

    else {
        if (a.type === "start" && b.type === "end") {
            return -1;
        }
        else if (a.type === "end" && b.type === "start") {
            return 1;
        }
        else {
            return 0;
        }
    }
}

