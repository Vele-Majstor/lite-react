import { LabelValue } from "@/type-utils/listbox";
import { useModalPosition } from "@/utils/modal";
import { classNames } from "@/utils/classnames";
import {
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "@/components/Dropdown/Dropdown.scss";
import ListBox from "../ListBox";
import { ListBoxItemTemplate } from "../ListBox/ListBox.types";
import { arrayUniqueByKey } from "@/utils/uniqBy";
import XIcon from "@/icons/XIcon";
import ChevronUp from "@/icons/ChevronUp";

type Props<T> = {
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options: LabelValue<T>[];
  filterBy?: "label" | "value";
  value: T[] | null;
  filterValue: string;
  onChangeFilterValue: (filterValue: string) => void;
  onChange: (value: {
    value: T[] | null;
    event:
      | MouseEvent<HTMLLIElement | HTMLButtonElement>
      | KeyboardEvent<HTMLLIElement>;
  }) => void;
  showClear?: boolean;
  itemTemplate?: ListBoxItemTemplate<T>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "value">;

function ComboMultiSelect<T>({
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
  const [preservedOptions, setPreservedOptions] = useState(Array.from(options));
  const [preservedValue, setPreservedValue] = useState(
    (value?.map((val) => findOptionInPreservedOptions(val)) ??
      []) as LabelValue<T>[]
  );

  useEffect(() => {
    if (preservedValue && preservedValue.length > 0) {
      setPreservedOptions(
        arrayUniqueByKey(options.concat(preservedValue), "value")
      );
      return;
    }
    setPreservedOptions(Array.from(options));
  }, [options]);

  useEffect(() => {
    if (!value) {
      setPreservedValue([]);
      return;
    }

    if (value?.every((val) => findOptionInPreservedOptions(val))) {
      setPreservedValue(
        value.map((val) => findOptionInPreservedOptions(val)) as LabelValue<T>[]
      );
      return;
    }

    if (value?.every((val) => findOptionInPropOptions(val))) {
      setPreservedValue(
        value.map((val) => findOptionInPropOptions(val)) as LabelValue<T>[]
      );
    }
  }, [value]);

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
      !inputRef.current?.contains(e.relatedTarget) &&
      !listBoxRef.current?.contains(e.relatedTarget)
    ) {
      hideListBox();
    }
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

  function findOptionInPropOptions(value: T | null) {
    return options?.find((option) => option.value == value);
  }

  function findOptionInPreservedOptions(value: T | null) {
    return preservedOptions?.find((option) => option.value == value);
  }

  function showListBox() {
    setVisible(true);
  }

  function hideListBox() {
    setVisible(false);
  }

  function multiSelectItemTemplate(option: LabelValue<T>) {
    return (
      <div className={"dropdown_option"}>
        <div className={"dropdown_option__container"}>
          <input
            tabIndex={-1}
            type="checkbox"
            readOnly
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
        onBlur={dropdownBlurHandler}
        onKeyUp={listKeyUpDown}
        {...other}
      >
        <span className={"dropdown_value"}>
          {value?.map((val, idx) => (
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
              {findOptionInPreservedOptions(val)?.label}
            </button>
          ))}

          <input
            ref={inputRef}
            value={filterValue}
            onChange={(event) => onChangeFilterValue(event.target.value)}
            placeholder={placeholder}
            className={"dropdown_multiselect_input"}
            onFocus={showListBox}
            onBlur={dropdownBlurHandler}
          />
        </span>

        {showClear && value && (
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
        onChange={(e) => {
          onChange(e);
          inputRef.current?.focus();
        }}
        itemTemplate={itemTemplate || multiSelectItemTemplate}
        style={position}
        options={filteredOptions}
        visible={visible}
        onBlur={dropdownBlurHandler}
        loading={loading}
        multiple={true}
      />
    </>
  );
}

export default ComboMultiSelect;
