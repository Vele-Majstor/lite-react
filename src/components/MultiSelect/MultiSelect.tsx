import { LabelValue } from "@/type-utils/listbox";
import { useModalPosition } from "@/utils/modal";
import { classNames } from "@/utils/classnames";
import {
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";

import "../Dropdown/Dropdown.scss";
import ListBox from "../ListBox/ListBox";
import { ListBoxItemTemplate } from "../ListBox/ListBox.types";
import XIcon from "@/icons/XIcon";
import ChevronUp from "@/icons/ChevronUp";

type Props<T> = {
  maxSelectedLabels?: number;
  disabled?: boolean;
  placeholder?: string;
  options: LabelValue<T>[];
  value: T[] | null;
  onChange: (value: {
    value: T[] | null;
    event:
      | MouseEvent<HTMLLIElement | HTMLButtonElement>
      | KeyboardEvent<HTMLLIElement>;
  }) => void;
  showClear?: boolean;
  itemTemplate?: ListBoxItemTemplate<T>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "value">;

function MultiSelect<T>({
  maxSelectedLabels = 3,
  disabled = false,
  showClear = false,
  placeholder = "Choose an option",
  options,
  onChange,
  value,
  className,
  itemTemplate,
  ...other
}: Props<T>): JSX.Element {
  const [visible, setVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);

  const { position } = useModalPosition(
    containerRef,
    listBoxRef,
    visible,
    () => {
      setVisible(false);
    }
  );

  function dropdownClickHandler() {
    setVisible((prev) => !prev);
  }

  function dropdownBlurHandler(
    e: FocusEvent<HTMLDivElement | HTMLUListElement>
  ) {
    if (
      !containerRef.current?.contains(e.relatedTarget) &&
      !listBoxRef.current?.contains(e.relatedTarget)
    ) {
      hideListBox();
    }
  }

  function clearValue(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    onChange({ value: null, event });
    if (!visible) {
      setVisible(true);
    }
    containerRef.current?.focus();
  }

  function listKeyUpDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (event.code === "ArrorUp" || event.code === "ArrowDown") {
      (listBoxRef.current?.children[0] as HTMLElement)?.focus();
    }
  }

  function findOption(value: T | null) {
    return options?.find((option) => option.value == value);
  }

  function hideListBox() {
    setVisible(false);
  }

  function generateSelectedOptionLabels() {
    if (value && value.length > 0 && value.length < maxSelectedLabels) {
      return (
        <span className={"dropdown_value"}>
          {value.map((val, idx) => (
            <button
              key={idx}
              className={"dropdown_value__chip"}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                const filteredValue: T[] = value.filter((o) => o !== val);
                onChange({
                  value: filteredValue.length > 0 ? filteredValue : null,
                  event,
                });
                containerRef.current?.focus();
              }}
            >
              {findOption(val)?.label}
            </button>
          ))}
        </span>
      );
    } else if (value && value.length > 0 && value.length >= maxSelectedLabels) {
      return (
        <span className={"dropdown_value"}>{`${value.length} selected`}</span>
      );
    } else {
      return <span className={"dropdown_value"}>{placeholder}</span>;
    }
  }

  function multiSelectItemTemplate(option: LabelValue<T>) {
    return (
      <div className={"dropdown_option"}>
        <div className={"dropdown_option__container"}>
          <input
            tabIndex={-1}
            readOnly
            type="checkbox"
            checked={value?.includes(option.value) ?? false}
          />
          <span className={"dropdown_option__checkmark"}></span>
        </div>
        <span>{option.label}</span>
      </div>
    );
  }

  return (
    <>
      <div
        tabIndex={0}
        ref={containerRef}
        className={classNames("dropdown", className, {
          dropdown_disabled: disabled,
        })}
        onClick={dropdownClickHandler}
        onBlur={dropdownBlurHandler}
        onKeyUp={listKeyUpDown}
        {...other}
      >
        {generateSelectedOptionLabels()}
        {showClear && value && value.length > 0 && (
          <button className={"dropdown_clear_btn"} onClick={clearValue}>
            <XIcon />
          </button>
        )}
        <span className={"dropdown_divider"} />
        <span
          className={"dropdown_chevron"}
          style={
            visible
              ? { translate: "0 -0.25rem", transform: "rotate(180deg)" }
              : {}
          }
        >
          <ChevronUp />
        </span>
      </div>

      <ListBox
        ref={listBoxRef}
        value={value}
        onChange={onChange}
        onBlur={dropdownBlurHandler}
        itemTemplate={itemTemplate || multiSelectItemTemplate}
        style={position}
        options={options}
        visible={visible}
        multiple={true}
      />
    </>
  );
}

export default MultiSelect;
