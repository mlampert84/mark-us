import React, { FunctionComponent } from "react";
import { Category, grammarCategories } from '../types/MarkupCategory';

type props = {
    category: Category;
    onCategorySelect: (category: Category) => void;

}

const CategoryMenu: FunctionComponent<props> = ({ category, onCategorySelect }) => {

    const buttons = [];

    for (let i = 0; i < grammarCategories.length; i++) {
        buttons.push(
            <button style={{ backgroundColor: grammarCategories[i].color }}
                onClick={(event) => onCategorySelect(grammarCategories[i].category)}
            >{grammarCategories[i].category}</button>)
    }
    return <>{buttons}</>
}

export default CategoryMenu;