export type Category = string;


export interface CategoryColor {
    category: Category;
    color: string;
};

export const grammarCategories: CategoryColor[] =
    [
        {
            category: "Subjekt",
            color: "red"
        },
        {
            category: "Akkusativobjekt",
            color: "green"
        },
        {
            category: "Dativobjekt",
            color: "blue"
        }

    ]

export function cssBackgroundColor(catalogue: CategoryColor[], category?: Category): string {


    if (typeof category === "undefined" || category === null) {
        return "";
    }

    const entry = catalogue.find(element => element.category === category);

    if (typeof entry === "undefined") {
        return "";
    }

    return entry.color;


}


