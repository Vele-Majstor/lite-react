import { KeyboardEvent } from "react";

import "../ListBox/ListBox.scss";
import { ContextMenuItemTemplate, LabelAction } from "./ContextMenu.types";

type Props = {
  option: LabelAction;
  template: ContextMenuItemTemplate;
};
function ContextMenuItem({ option, template }: Props): JSX.Element {
  function setContent(option: LabelAction) {
    return template
      ? typeof template === "function"
        ? template(option)
        : template
      : option.label;
  }

  function listItemKeyUpUp(event: KeyboardEvent<HTMLLIElement>) {
    (
      (event.target as HTMLLIElement).previousElementSibling as HTMLLIElement
    )?.focus();
  }

  function listItemKeyUpDown(event: KeyboardEvent<HTMLLIElement>) {
    (
      (event.target as HTMLLIElement).nextElementSibling as HTMLLIElement
    )?.focus();
  }

  function listItemEscape(event: KeyboardEvent<HTMLLIElement>) {
    (event.target as HTMLLIElement).blur();
  }

  function navigateThroughList(event: KeyboardEvent<HTMLLIElement>) {
    event.stopPropagation();
    event.preventDefault();

    switch (event.code) {
      case "ArrowUp":
        listItemKeyUpUp(event);
        break;

      case "ArrowDown":
        listItemKeyUpDown(event);
        break;
      case "Escape":
        listItemEscape(event);
        break;
      case "Space":
      case "Enter":
        option.action.call(event);
        break;
    }
  }

  return (
    <li
      key={option.label}
      tabIndex={0}
      onKeyDown={navigateThroughList}
      onClick={(event) => {
        option.action.call(event);
      }}
      className={"listItem"}
      aria-label={option.label}
    >
      {setContent(option)}
    </li>
  );
}

export default ContextMenuItem;
