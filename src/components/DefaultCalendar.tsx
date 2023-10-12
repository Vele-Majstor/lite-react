import { classNames } from "@/utils/classnames";
import styles from "./Calendar.module.scss";
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
import { useModalPosition } from "@/utils/modal";
import {
    createUTCDateFromString,
    isValidDate,
    matchDateFormat,
} from "./Calendar.functions";
import Calendar from "./Calendar";
import { useDebounce } from "@/hooks/useDebouncedValue";

type Props = {
    value: Date | null;
    onChange: (value: {
        value: Date | null;
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

function DefaultCalendar({
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

    const [visible, setVisible] = useState(true);

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
            !calendarRef.current?.contains(e.relatedTarget)
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
        if (event.date.toUTCString() !== (value as Date)?.toUTCString()) {
            onChange({
                value: event.date,
                event: event.originalEvent,
            });
            setInputVal(formatter.format(event.date));
        } else {
            onChange({ value: null, event: event.originalEvent });
            setInputVal("");
            inputRef.current?.focus();
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
                setInputVal(formatter.format(newValue));
                onChange({
                    value: newValue,
                    event,
                });
                setCurrentYear(newValue?.getUTCFullYear());
                setCurrentMonth(newValue?.getUTCMonth());
                return;
            }
            setInputVal("");
        }
    }

    function onInputBlur() {
        if (value) {
            setInputVal(formatter.format(value));
            setCurrentYear(value?.getUTCFullYear());
            setCurrentMonth(value?.getUTCMonth());
            return;
        }
        setInputVal("");
    }

    function isDateSelected(date: Date) {
        return date.toUTCString() === value?.toUTCString();
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

export default DefaultCalendar;
