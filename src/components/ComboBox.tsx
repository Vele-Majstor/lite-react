import { LabelValue } from "@/type-utils/listbox";
import { useModalPosition } from "@/utils/modal";
import { classNames } from "@/utils/classnames";
import {
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./Dropdown.module.scss";
import ListBox from "./ListBox";
import { ListBoxItemTemplate } from "./ListBox.types";
import XIcon from "@/icons/XIcon";
import ChevronUp from "@/icons/ChevronUp";

type Props<T> = {
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options: LabelValue<T>[];
  filterBy?: "label" | "value";
  value: T | null;
  filterValue: string;
  onChangeFilterValue: (filterValue: string) => void;
  onChange: (value: {
    value: T | null;
    event:
      | MouseEvent<HTMLLIElement | HTMLButtonElement>
      | KeyboardEvent<HTMLLIElement>;
  }) => void;
  showClear?: boolean;
  itemTemplate?: ListBoxItemTemplate<T>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "value">;

function ComboBox<T>({
  loading = false,
  disabled = false,
  showClear = false,
  placeholder = "Choose an option",
  options,
  filterBy = "label",
  onChange,
  onChangeFilterValue,
  value,
  filterValue,
  className,
  itemTemplate,
  ...other
}: Props<T>): JSX.Element {
  const [visible, setVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { position } = useModalPosition(
    containerRef,
    listBoxRef,
    visible,
    () => {
      setVisible(false);
    }
  );

  const filteredOptions = useMemo(() => {
    const filteredOptions = options?.filter((option) => {
      if (filterBy === "label") {
        return option.label.toLowerCase().includes(filterValue.toLowerCase());
      }
      return String(option.value)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });

    return filteredOptions?.length > 0
      ? filteredOptions
      : ([{ label: "No results found", value: null }] as LabelValue<T>[]);
  }, [filterBy, filterValue, options]);

  function dropdownBlurHandler(
    e: FocusEvent<HTMLDivElement | HTMLUListElement>
  ) {
    if (
      !containerRef.current?.contains(e.relatedTarget) &&
      !listBoxRef.current?.contains(e.relatedTarget)
    ) {
      hideListBox();
    }

    refreshFilterValue();
  }

  function clearValue(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    onChange({ value: null, event });
    onChangeFilterValue("");
    if (!visible) {
      showListBox();
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

  function refreshFilterValue() {
    if (value) {
      onChangeFilterValue(findOption(value)?.label ?? "");
      return;
    }
    onChangeFilterValue("");
  }

  function showListBox() {
    setVisible(true);
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
        onBlur={dropdownBlurHandler}
        onKeyUp={listKeyUpDown}
        {...other}
      >
        <input
          ref={inputRef}
          value={filterValue}
          onChange={(event) => onChangeFilterValue(event.target.value)}
          placeholder={placeholder}
          className={styles.dropdown_input}
          onFocus={showListBox}
          onBlur={dropdownBlurHandler}
        />

        {showClear && value && (
          <button className={styles.dropdown_clear_btn} onClick={clearValue}>
            <XIcon className={styles.dropdown_clear_btn} />
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

          if (e.value) {
            hideListBox();
            onChangeFilterValue(findOption(e.value)?.label ?? "");
            return;
          }
          onChangeFilterValue("");
          inputRef.current?.focus();
        }}
        itemTemplate={itemTemplate}
        style={position}
        options={filteredOptions}
        visible={visible}
        onBlur={dropdownBlurHandler}
        loading={loading}
      />
    </>
  );
}

export default ComboBox;
