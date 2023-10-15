import "./Calendar.scss";
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, MouseEvent } from "react";
type Props = {
    value: [Date | null, Date | null] | null;
    onChange: (value: {
        value: [Date | null, Date | null] | null;
        event: MouseEvent<HTMLOptionElement> | KeyboardEvent<HTMLOptionElement> | ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>;
    }) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    placeholder?: string;
    formatter?: Intl.DateTimeFormat;
    dateRegExp?: RegExp[] | RegExp;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;
declare function RangeCalendar({ value, onChange, className, disabled, maxDate, minDate, dateRegExp, formatter, ...other }: Props): JSX.Element;
export default RangeCalendar;
