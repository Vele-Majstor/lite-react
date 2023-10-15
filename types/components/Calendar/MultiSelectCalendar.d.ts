import "./Calendar.scss";
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, MouseEvent } from "react";
type Props = {
    value: Date[] | null;
    onChange: (value: {
        value: Date[] | null;
        event: MouseEvent<HTMLOptionElement> | KeyboardEvent<HTMLOptionElement> | ChangeEvent<HTMLInputElement>;
    }) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    placeholder?: string;
    formatter?: Intl.DateTimeFormat;
    dateRegExp?: RegExp[] | RegExp;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;
declare function MultiSelectCalendar({ value, onChange, className, disabled, maxDate, minDate, placeholder, dateRegExp, formatter, ...other }: Props): JSX.Element;
export default MultiSelectCalendar;
