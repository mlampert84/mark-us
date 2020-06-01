export type Category = string;


export interface CategoryColor {
    category: Category;
    color: string;
};

export const grammarCategories: CategoryColor[] =
    [
        {
            category: "Subjekt",
            color: "pink"
        },
        {
            category: "Akkusativobjekt",
            color: "lightgreen"
        },
        {
            category: "Dativobjekt",
            color: "lightblue"
        }

    ]

export function mapCategoryToColor(category?: Category): string {

    if (typeof category === "undefined" || category === null) {
        return "";
    }

    const entry = grammarCategories.find(element => element.category === category);

    if (typeof entry === "undefined") {
        return "";
    }

    return entry.color;
}

