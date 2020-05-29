export interface SelectionType {
    name: string;
    color: string;
};

export interface Selection {
    type: SelectionType;
    id: string;
    begin: number;
    end: number;
}




export interface Cut{
    id: string;
    type: "start" | "end";
    index: number;   
}


export function selectionToCuts(selections : Selection[]) : Cut[] {
    let cuts : Cut[] = [];


    for(let s of selections){
        const startCut: Cut = {
            id: s.id,
            type: "start",
            index: s.begin
        }
        
        const endCut : Cut = {
            id: s.id,
            type: "end",
            index: s.end
            
        }

        cuts.push(startCut, endCut);


    }

    cuts.sort(cutComparator);
    
    return cuts;

}

function cutComparator(a: Cut, b: Cut): -1| 0 | 1{
    if(a.index < b.index){
        return -1;
    }

    else if(a.index > b.index){
        return 1;
    }

    else{
        if(a.type === "start" && b.type === "end"){
        return -1;
        }
        else if(a.type === "end" && b.type === "start"){
            return 1;
        }
        else{
            return 0;
        }
    }
}