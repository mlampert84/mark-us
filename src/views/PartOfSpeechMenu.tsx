import React, { CSSProperties, forwardRef } from "react";
import { parts, PartOfSpeech } from "../types/Clause";

export type MenuPosition = {
  x: number;
  y: number;
};

type Props = {
  position: MenuPosition;
  addSelection: (pos: PartOfSpeech) => void;
};

const Menu = forwardRef<HTMLUListElement, Props>((props: Props, ref) => {
  const yOffSet = 20;

  const menuPosition: CSSProperties = {
    position: "absolute",
    left: `${props.position.x}px`,
    top: `${props.position.y + yOffSet}px`,
    backgroundColor: "red",
  };

  const menuItems = parts.map((p) => {
    const style = {
      backgroundColor: p.color,
    };
    return (
      <li
        key={p.partOfSpeech}
        style={style}
        className="menuItem"
        onClick={() => {
          props.addSelection(p.partOfSpeech);
        }}
      >
        {p.displayName}
      </li>
    );
  });

  return (
    <ul className="menu" style={menuPosition} ref={ref}>
      {menuItems}
    </ul>
  );
});

export default Menu;
