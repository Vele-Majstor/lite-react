import { classNames } from "@/utils/classnames";
import styles from "./Calendar.module.scss";
import { useModalPosition } from "@/utils/modal";
import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  createUTCDateFromString,
  isValidDate,
  matchDateFormat,
} from "./Calendar.functions";
import Calendar from "./Calendar";
import { useDebounce } from "@/hooks/useDebouncedValue";

type Props = {
  value: Date[] | null;
  onChange: (value: {
    value: Date[] | null;
    event:
      | MouseEvent<HTMLOptionElement>
      | KeyboardEvent<HTMLOptionElement>
      | ChangeEvent<HTMLInputElement>;
  }) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  formatter?: Intl.DateTimeFormat;
  dateRegExp?: RegExp[] | RegExp;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

function MultiSelectCalendar({
  value,
  onChange,
  className,
  disabled,
  maxDate = new Date(8640000000000000),
  minDate = new Date(-8640000000000000),
  placeholder,
  dateRegExp,
  formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }),
  ...other
}: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getUTCFullYear());

  const [inputVal, setInputVal] = useState("");
  const inputEvent = useRef<ChangeEvent<HTMLInputElement> | null>(null);
  const debouncedUptateField = useDebounce(inputVal, 300);

  useEffect(() => {
    if (debouncedUptateField && inputEvent.current) {
      updateInputField(inputEvent.current);
    }
  }, [debouncedUptateField]);

  const [visible, setVisible] = useState(false);

  const { position } = useModalPosition(
    containerRef,
    calendarRef as any,
    visible,
    () => {
      setVisible(false);
    }
  );

  function dateModalBlurHandler(
    e: FocusEvent<HTMLDivElement | HTMLUListElement>
  ) {
    if (
      !containerRef.current?.contains(e.relatedTarget) &&
      !calendarRef.current?.contains(e.relatedTarget) &&
      !inputRef.current?.contains(e.relatedTarget)
    ) {
      hideModal();
    }
  }

  function hideModal() {
    setVisible(false);
  }

  function showModal() {
    setVisible(true);
  }

  const selectOption = (event: {
    date: Date;
    originalEvent:
      | MouseEvent<HTMLOptionElement>
      | KeyboardEvent<HTMLOptionElement>
      | ChangeEvent<HTMLInputElement>;
  }) => {
    const mappedValue = (value as Date[])?.map((date) => date.toUTCString());
    if (mappedValue?.includes(event.date.toUTCString())) {
      const filteredValue = mappedValue
        .filter((o) => o !== event.date.toUTCString())
        .map((date) => new Date(date));

      onChange({
        value: filteredValue.length > 0 ? filteredValue : null,
        event: event.originalEvent,
      });
    } else {
      onChange({
        value: [...(value ?? []), event.date],
        event: event.originalEvent,
      });
    }
  };

  function onChangeInputVal(event: ChangeEvent<HTMLInputElement>) {
    setInputVal(event.target.value);
    inputEvent.current = event;
  }

  function updateInputField(event: ChangeEvent<HTMLInputElement>) {
    const matchedDate = matchDateFormat(event.target.value, dateRegExp);
    if (matchedDate && isValidDate(new Date(matchedDate))) {
      const newValue = createUTCDateFromString(matchedDate);
      if (
        minDate.getTime() <= newValue?.getTime() &&
        maxDate.getTime() >= newValue?.getTime()
      ) {
        const mappedValue = (value as Date[])?.map((date) =>
          date.toUTCString()
        );
        if (!mappedValue?.includes(newValue.toUTCString())) {
          onChange({
            value: [...((value as Date[]) ?? []), newValue] as Date[] & Date,
            event,
          });
        }
        setInputVal("");
        setCurrentYear(newValue?.getUTCFullYear());
        setCurrentMonth(newValue?.getUTCMonth());
      }
    }
  }

  function onInputBlur() {
    setInputVal("");
  }

  function filterOutDate(date: Date, event: MouseEvent<HTMLOptionElement>) {
    const mappedValue = (value as Date[])?.map((date) => date.toUTCString());
    const filteredValue = mappedValue
      .filter((o) => o !== date.toUTCString())
      .map((date) => new Date(date));

    onChange({
      value: filteredValue.length > 0 ? filteredValue : null,
      event,
    });

    inputRef.current?.focus();
  }

  function isDateSelected(date: Date) {
    return !!value
      ?.map((date) => date.toUTCString())
      .includes(date.toUTCString());
  }

  return (
    <div
      tabIndex={0}
      ref={containerRef}
      className={classNames(styles.date_picker__container, className, {
        [styles["date_picker__input--disabled"]]: disabled,
      })}
      onFocus={showModal}
      onBlur={dateModalBlurHandler}
      {...other}
    >
      <div className={styles.date_picker__value}>
        {value?.map((date) => (
          <option
            key={date.toUTCString()}
            className={styles["date_picker__value--chip"]}
            onClick={(event) => filterOutDate(date, event)}
          >
            {formatter.format(date)}
          </option>
        ))}
        <input
          ref={inputRef}
          value={inputVal}
          onChange={onChangeInputVal}
          placeholder={placeholder}
          className={styles.date_picker__input}
          onFocus={showModal}
          onBlur={onInputBlur}
          disabled={disabled}
        />
      </div>
      <Calendar
        ref={calendarRef}
        visible={visible}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        maxDate={maxDate}
        minDate={minDate}
        selectOption={selectOption}
        isDateSelected={isDateSelected}
        style={position}
        onBlur={dateModalBlurHandler}
      />
    </div>
  );
}

export default MultiSelectCalendar;
