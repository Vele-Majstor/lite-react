import { LabelValue } from "@/type-utils/listbox";
import { useModalPosition } from "@/utils/modal";
import {
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";

import styles from "./Dropdown.module.scss";
import ListBox from "./ListBox";
import { ListBoxItemTemplate } from "./ListBox.types";
import { classNames } from "@/utils/classnames";
import XIcon from "@/icons/XIcon";
import ChevronUp from "@/icons/ChevronUp";

type Props<T> = {
  disabled?: boolean;
  placeholder?: string;
  options: LabelValue<T>[];
  value: T | null;
  onChange: (value: {
    value: T | null;
    event:
      | MouseEvent<HTMLLIElement | HTMLButtonElement>
      | KeyboardEvent<HTMLLIElement>;
  }) => void;
  showClear?: boolean;
  itemTemplate?: ListBoxItemTemplate<T>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "value">;

function Dropdown<T>({
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

  return (
    <>
      <div
        tabIndex={0}
        ref={containerRef}
        className={classNames(styles.dropdown, className, {
          [styles["dropdown_disabled"]]: disabled,
        })}
        onClick={dropdownClickHandler}
        onBlur={dropdownBlurHandler}
        onKeyUp={listKeyUpDown}
        {...other}
      >
        {
          <span className={styles.dropdown_value}>
            {findOption(value)?.label ?? placeholder}
          </span>
        }

        {showClear && value && (
          <button className={styles.dropdown_clear_btn} onClick={clearValue}>
            <XIcon />
          </button>
        )}
        <span className={styles.dropdown_divider} />
        <span
          className={styles.dropdown_chevron}
          style={visible ? { transform: "rotate(180deg)" } : {}}
        >
          <ChevronUp />
        </span>
      </div>

      <ListBox
        ref={listBoxRef}
        value={value}
        onChange={(e) => {
          onChange(e);
          hideListBox();
        }}
        itemTemplate={itemTemplate}
        style={position}
        options={options}
        visible={visible}
        onBlur={dropdownBlurHandler}
      />
    </>
  );
}

export default Dropdown;
