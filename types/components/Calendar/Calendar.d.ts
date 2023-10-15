import "./Calendar.scss";
import { Dispatch, HTMLAttributes, KeyboardEvent, MouseEvent, SetStateAction } from "react";
declare const Calendar: import("react").ForwardRefExoticComponent<{
    visible: boolean;
    currentMonth: number;
    setCurrentMonth: Dispatch<SetStateAction<number>>;
    currentYear: number;
    setCurrentYear: Dispatch<SetStateAction<number>>;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectOption: (event: {
        date: Date;
        originalEvent: MouseEvent<HTMLOptionElement> | KeyboardEvent<HTMLOptionElement>;
    }) => void;
    isDateSelected: (date: Date) => boolean;
} & HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export default Calendar;
