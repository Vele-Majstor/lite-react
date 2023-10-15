import { LabelValue } from "@/type-utils/listbox";
import { createPortal } from "react-dom";
import {
  ForwardedRef,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  forwardRef,
} from "react";
import { CSSTransition } from "react-transition-group";

import "./ListBox.scss";
import {
  ListBoxItemTemplate,
  MultipleSelectProps,
  SingleSelectProps,
} from "./ListBox.types";
import { classNames } from "@/utils/classnames";
import ListBoxItem from "./ListBoxItem";
import "@/styles/transitions.scss";

type Props<T> = {
  loading?: boolean;
  options: LabelValue<T>[] | null;
  itemTemplate?: ListBoxItemTemplate<T>;
  visible?: boolean;
} & (SingleSelectProps<T> | MultipleSelectProps<T>) &
  Omit<HTMLAttributes<HTMLUListElement>, "value" | "onChange">;

function ListBox<T>(
  {
    loading = false,
    multiple = false,
    visible = true,
    value,
    options,
    onChange,
    itemTemplate,
    className,
    ...other
  }: Props<T>,
  ref: ForwardedRef<HTMLUListElement>
): JSX.Element {
  function listKeyUpDown(event: KeyboardEvent<HTMLUListElement>) {
    event.preventDefault();
    if (event.code !== "ArrowDown" && event.code !== "ArrowUp") {
      return;
    }

    const activeListElement = Array.from(
      (event.target as HTMLUListElement).children
    ).find((element) => element === document.activeElement);

    if (activeListElement) {
      if (event.code === "ArrowUp") {
        (activeListElement.nextElementSibling as HTMLElement)?.focus();
      }
      if (event.code === "ArrowDown") {
        (activeListElement.previousElementSibling as HTMLElement)?.focus();
      }

      return;
    }

    ((event.target as HTMLUListElement).children[0] as HTMLElement)?.focus();
  }

  const selectOption = (event: {
    option: LabelValue<T>;
    originalEvent: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>;
  }) => {
    if (multiple) {
      if ((value as T[])?.includes(event.option.value)) {
        const filteredValue = (value as T[]).filter(
          (o) => o !== event.option.value
        );

        onChange({
          value: filteredValue.length > 0 ? (filteredValue as T & T[]) : null,
          event: event.originalEvent,
        });
      } else {
        onChange({
          value: [...((value as T[]) ?? []), event.option.value] as T[] & T,
          event: event.originalEvent,
        });
      }
    } else {
      if (event.option.value !== value) {
        onChange({
          value: event.option.value as T[] & T,
          event: event.originalEvent,
        });
      } else {
        onChange({ value: null, event: event.originalEvent });
      }
    }
  };

  const isOptionSelected = (option: LabelValue<T>) => {
    return multiple && Array.isArray(value)
      ? value?.includes(option.value)
      : option.value === value;
  };
  const listBoxPortalContainer =
    document.getElementById("listbox-portal-container") || document.body;

  return createPortal(
    <CSSTransition
      nodeRef={ref}
      in={visible}
      timeout={200}
      classNames={"fade"}
      unmountOnExit
    >
      <ul
        data-listbox-menu
        className={classNames(className, "listbox")}
        ref={ref}
        onKeyDown={listKeyUpDown}
        {...other}
      >
        {loading && <div className={"dot-flashing"}></div>}
        {options?.map((option) => (
          <ListBoxItem
            key={option.label}
            option={option}
            template={itemTemplate}
            selectOption={selectOption}
            isOptionSelected={isOptionSelected}
          />
        ))}
      </ul>
    </CSSTransition>,
    listBoxPortalContainer
  );
}

export default forwardRef(ListBox) as <T>(
  props: Props<T> & { ref?: ForwardedRef<HTMLUListElement> }
) => ReturnType<typeof ListBox>;
