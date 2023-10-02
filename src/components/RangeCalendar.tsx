import styles from "./Calendar.module.scss";
import { classNames } from "@/utils/classnames";
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
import Calendar from "./Calendar";
import {
    createUTCDateFromString,
    isValidDate,
    matchDateFormat,
} from "./Calendar.functions";
import { useDebounce } from "@/hooks/useDebouncedValue";
import XIcon from "@/icons/XIcon";
import Minus from "@/icons/Minus";

type Props = {
    value: [Date | null, Date | null] | null;
    onChange: (value: {
        value: [Date | null, Date | null] | null;
        event:
        | MouseEvent<HTMLOptionElement>
        | KeyboardEvent<HTMLOptionElement>
        | ChangeEvent<HTMLInputElement>
        | MouseEvent<HTMLButtonElement>;
    }) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    placeholder?: string;
    formatter?: Intl.DateTimeFormat;
    dateRegExp?: RegExp[] | RegExp;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

function RangeCalendar({
    value,
    onChange,
    className,
    disabled,
    maxDate = new Date(8640000000000000),
    minDate = new Date(-8640000000000000),
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
    const inputFromRef = useRef<HTMLInputElement>(null);
    const inputToRef = useRef<HTMLInputElement>(null);

    const [currentMonth, setCurrentMonth] = useState(new Date().getUTCMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getUTCFullYear());

    const [fromInputVal, setFromInputVal] = useState("");
    const fromInputEvent = useRef<ChangeEvent<HTMLInputElement> | null>(null);
    const [toInputVal, setToInputVal] = useState("");
    const toInputEvent = useRef<ChangeEvent<HTMLInputElement> | null>(null);

    const [visible, setVisible] = useState(false);

    const debouncedUpdateFromField = useDebounce(fromInputVal, 300);
    const debouncedUpdateToField = useDebounce(toInputVal, 300);

    useEffect(() => {
        if (debouncedUpdateFromField && fromInputEvent.current) {
            updateInputFromField(fromInputEvent.current);
        }
    }, [debouncedUpdateFromField]);

    useEffect(() => {
        if (debouncedUpdateToField && toInputEvent.current) {
            updateInputToField(toInputEvent.current);
        }
    }, [debouncedUpdateToField]);

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
            !inputFromRef.current?.contains(e.relatedTarget) &&
            !inputToRef.current?.contains(e.relatedTarget)
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

    function changeFromInputVal(event: ChangeEvent<HTMLInputElement>) {
        setFromInputVal(event.target.value);
        fromInputEvent.current = event;
    }

    function changeToInputVal(event: ChangeEvent<HTMLInputElement>) {
        setToInputVal(event.target.value);
        toInputEvent.current = event;
    }

    function updateInputFromField(event: ChangeEvent<HTMLInputElement>) {
        const matchedDate = matchDateFormat(event.target.value);
        if (matchedDate && isValidDate(new Date(matchedDate))) {
            const newValue = createUTCDateFromString(matchedDate);
            if (
                minDate.getTime() <= newValue?.getTime() &&
                maxDate.getTime() >= newValue?.getTime()
            ) {
                if (value && value[1] && value[1].getTime() < newValue.getTime()) {
                    onChange({
                        value: [value[1], newValue],
                        event,
                    });
                    setFromInputVal(formatter.format(value[1]));
                    setToInputVal(formatter.format(newValue));
                } else {
                    onChange({
                        value: [newValue, value?.[1] || null],
                        event,
                    });
                    setFromInputVal(formatter.format(newValue));
                }
                setCurrentYear(newValue?.getUTCFullYear());
                setCurrentMonth(newValue?.getUTCMonth());
                return;
            }
            setFromInputVal("");
        }
    }

    function updateInputToField(event: ChangeEvent<HTMLInputElement>) {
        const matchedDate = matchDateFormat(event.target.value, dateRegExp);
        if (matchedDate && isValidDate(new Date(matchedDate))) {
            const newValue = createUTCDateFromString(matchedDate);
            if (
                minDate.getTime() <= newValue?.getTime() &&
                maxDate.getTime() >= newValue?.getTime()
            ) {
                if (value && value[0] && value[0].getTime() > newValue.getTime()) {
                    onChange({
                        value: [newValue, value[0]],
                        event,
                    });
                    setFromInputVal(formatter.format(newValue));
                    setToInputVal(formatter.format(value[0]));
                } else {
                    onChange({
                        value: [value?.[0] || null, newValue],
                        event,
                    });
                    setToInputVal(formatter.format(newValue));
                }
                setCurrentYear(newValue?.getUTCFullYear());
                setCurrentMonth(newValue?.getUTCMonth());
                return;
            }
            setToInputVal("");
        }
    }

    function onInputFromBlur(event: FocusEvent<HTMLInputElement>) {
        if (value && value[0]) {
            setFromInputVal(formatter.format(value[0]));
            setCurrentYear(value[0].getUTCFullYear());
            setCurrentMonth(value[0].getUTCMonth());
            return;
        }
        setFromInputVal("");

        dateModalBlurHandler(event);
    }

    function onInputToBlur(event: FocusEvent<HTMLInputElement>) {
        if (value && value[1]) {
            setToInputVal(formatter.format(value[1]));
            setCurrentYear(value[1].getUTCFullYear());
            setCurrentMonth(value[1].getUTCMonth());
            return;
        }
        setToInputVal("");

        dateModalBlurHandler(event);
    }

    function isDateSelected(date: Date) {
        if (Array.isArray(value)) {
            if (value[0] && value[1]) {
                return (
                    value[0].getTime() <= date.getTime() &&
                    date.getTime() <= value[1].getTime()
                );
            } else if (!value[0] && value[1]) {
                return value[1].getTime() === date.getTime();
            } else if (value[0] && !value[1]) {
                return value[0].getTime() === date.getTime();
            }
        }
        return false;
    }

    function selectOption(event: {
        date: Date;
        originalEvent:
        | MouseEvent<HTMLOptionElement>
        | KeyboardEvent<HTMLOptionElement>
        | ChangeEvent<HTMLInputElement>;
    }) {
        if (Array.isArray(value)) {
            if (value[0] && value[1]) {
                onChange({ event: event.originalEvent, value: [event.date, null] });
                setFromInputVal(formatter.format(event.date));
                setToInputVal("");
            } else if (!value[0] && value[1]) {
                if (event.date.getTime() > value[1].getTime()) {
                    onChange({
                        event: event.originalEvent,
                        value: [value[1], event.date],
                    });
                    setFromInputVal(formatter.format(value[1]));
                    setToInputVal(formatter.format(event.date));
                } else {
                    onChange({
                        event: event.originalEvent,
                        value: [event.date, value[1]],
                    });
                    setFromInputVal(formatter.format(event.date));
                    setToInputVal(formatter.format(value[1]));
                }
            } else if (value[0] && !value[1]) {
                if (event.date.getTime() < value[0].getTime()) {
                    onChange({
                        event: event.originalEvent,
                        value: [event.date, value[0]],
                    });
                    setFromInputVal(formatter.format(event.date));
                    setToInputVal(formatter.format(value[0]));
                } else {
                    onChange({
                        event: event.originalEvent,
                        value: [value[0], event.date],
                    });
                    setFromInputVal(formatter.format(value[0]));
                    setToInputVal(formatter.format(event.date));
                }
            }
            return;
        }
        onChange({ event: event.originalEvent, value: [event.date, null] });
        setFromInputVal(formatter.format(event.date));
        setToInputVal("");
    }

    function clearValue(event: MouseEvent<HTMLButtonElement>) {
        onChange({ value: null, event });
        setFromInputVal("");
        setToInputVal("");
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
            <div className={styles.date_picker__range_actions}>
                <input
                    ref={inputFromRef}
                    value={fromInputVal}
                    onChange={changeFromInputVal}
                    className={styles["date_picker__range_actions--input"]}
                    onFocus={showModal}
                    onBlur={onInputFromBlur}
                    disabled={disabled}
                />
                <span className={styles["date_picker__range_actions--icon"]}>
                    <Minus />
                </span>
                <input
                    ref={inputToRef}
                    value={toInputVal}
                    onChange={changeToInputVal}
                    className={styles["date_picker__range_actions--input"]}
                    onFocus={showModal}
                    onBlur={onInputToBlur}
                    disabled={disabled}
                />
            </div>
            <button onClick={clearValue} className={styles.date_picker__clear_btn}>
                <XIcon />
            </button>
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

export default RangeCalendar;
