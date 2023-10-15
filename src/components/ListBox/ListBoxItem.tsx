import { classNames } from "@/utils/classnames";
import { KeyboardEvent, MouseEvent } from "react";
import { LabelValue } from "@/type-utils/listbox";

import "./ListBox.scss";
import { ListBoxItemTemplate } from "./ListBox.types";

type Props<T> = {
  option: LabelValue<T>;
  template: ListBoxItemTemplate<T>;
  selectOption: (onClick: {
    option: LabelValue<T>;
    originalEvent: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>;
  }) => void;
  isOptionSelected: (option: LabelValue<T>) => boolean;
};
function ListBoxItem<T>({
  option,
  selectOption,
  template,
  isOptionSelected,
}: Props<T>): JSX.Element {
  function setContent(option: LabelValue<T>) {
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
        selectOption({ option, originalEvent: event });
        break;
    }
  }

  return (
    <li
      key={option.label}
      tabIndex={0}
      onKeyDown={navigateThroughList}
      onClick={(event) => {
        selectOption({ option, originalEvent: event });
      }}
      className={classNames("listItem", {
        listItem_active: isOptionSelected(option),
      })}
      aria-label={option.label}
    >
      {setContent(option)}
    </li>
  );
}

export default ListBoxItem;
