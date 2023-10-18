import "./Calendar.scss";
import {
  Dispatch,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import {
  days,
  daysInMonth,
  getDaysInMonthUTC,
  getUTCTimeStamp,
  months,
} from "./Calendar.functions";
import { classNames } from "@/utils/classnames";
import ChevronRight from "@/icons/ChevronRight";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronDoubleRight from "@/icons/ChevronDoubleRight";
import ChevronDoubleLeft from "@/icons/ChevronDoubleLeft";

type Props = {
  visible: boolean;
  currentMonth: number;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  currentYear: number;
  setCurrentYear: Dispatch<SetStateAction<number>>;
  minDate?: Date;
  maxDate?: Date;
  selectOption: (event: {
    date: Date;
    originalEvent:
      | MouseEvent<HTMLOptionElement>
      | KeyboardEvent<HTMLOptionElement>;
  }) => void;
  isDateSelected: (date: Date) => boolean;
} & HTMLAttributes<HTMLDivElement>;

const Calendar = forwardRef<HTMLDivElement, Props>(
  (
    {
      visible,
      maxDate = new Date(8640000000000000),
      minDate = new Date(-8640000000000000),
      selectOption,
      isDateSelected,
      currentYear,
      currentMonth,
      setCurrentYear,
      setCurrentMonth,
      ...other
    },
    calendarRef
  ): JSX.Element => {
    return createPortal(
      <CSSTransition
        in={visible}
        timeout={200}
        nodeRef={calendarRef}
        classNames={"fade"}
        unmountOnExit
      >
        <div ref={calendarRef} className={"date_picker__modal"} {...other}>
          <MonthPicker
            currentYear={currentYear}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            setCurrentYear={setCurrentYear}
            minDate={minDate}
            maxDate={maxDate}
          />
          <CalendarBody
            minDate={minDate}
            maxDate={maxDate}
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectOption={selectOption}
            isDateSelected={isDateSelected}
          />
        </div>
      </CSSTransition>,
      document.body
    );
  }
);

type MonthPickerProps = {
  currentYear: number;
  currentMonth: number;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  setCurrentYear: Dispatch<SetStateAction<number>>;
  minDate: Date;
  maxDate: Date;
};

function MonthPicker({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
  minDate,
  maxDate,
}: MonthPickerProps): JSX.Element {
  const nextMonth = () => {
    if (maxDate.getTime() >= new Date(currentYear, currentMonth).getTime()) {
      if (currentMonth < 11) {
        setCurrentMonth((prev) => prev + 1);
      } else {
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
      }
    }
  };

  const nextYear = () => {
    if (maxDate.getTime() >= new Date((currentYear + 1).toString()).getTime()) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  const prevYear = () => {
    if (minDate.getTime() <= new Date((currentYear - 1).toString()).getTime()) {
      setCurrentYear((prev) => prev - 1);
    }
  };

  const prevMonth = () => {
    if (minDate.getTime() <= new Date(currentYear, currentMonth).getTime()) {
      if (currentMonth > 0) {
        setCurrentMonth((prev) => prev - 1);
      } else {
        setCurrentMonth(11);
        setCurrentYear((prev) => prev - 1);
      }
    }
  };

  function getTimeFromState(_day: number) {
    return new Date(currentYear, currentMonth, _day).getTime();
  }

  return (
    <div tabIndex={0} className={"date_picker__header"}>
      <button
        disabled={minDate.getTime() > getTimeFromState(1)}
        onClick={prevYear}
        className={"date_picker__header--icon"}
      >
        <ChevronDoubleLeft />
      </button>
      <button
        disabled={minDate.getTime() > getTimeFromState(1)}
        onClick={prevMonth}
        className={"date_picker__header--icon"}
      >
        <ChevronLeft />
      </button>
      <p>
        {months[currentMonth]} {currentYear}
      </p>
      <button
        disabled={
          maxDate.getTime() <
          getTimeFromState(daysInMonth(currentMonth, currentYear))
        }
        onClick={nextMonth}
        className={"date_picker__header--icon"}
      >
        <ChevronRight />
      </button>
      <button
        disabled={
          maxDate.getTime() <
          getTimeFromState(daysInMonth(currentMonth, currentYear))
        }
        onClick={nextYear}
        className={"date_picker__header--icon"}
      >
        <ChevronDoubleRight />
      </button>
    </div>
  );
}
type CalendarBodyProps = {
  minDate: Date;
  maxDate: Date;
  currentYear: number;
  currentMonth: number;
  selectOption: (event: {
    date: Date;
    originalEvent:
      | MouseEvent<HTMLOptionElement>
      | KeyboardEvent<HTMLOptionElement>;
  }) => void;
  isDateSelected: (date: Date) => boolean;
};

function CalendarBody({
  currentMonth,
  currentYear,
  selectOption,
  isDateSelected,
  minDate,
  maxDate,
}: CalendarBodyProps): JSX.Element {
  return (
    <div className={"date_picker__body"}>
      {days.map((day) => (
        <span key={day}>{day}</span>
      ))}
      {getDaysInMonthUTC(currentMonth, currentYear).map((date, index) => (
        <option
          tabIndex={0}
          disabled={
            date.getUTCMonth() !== currentMonth ||
            getUTCTimeStamp(minDate) > getUTCTimeStamp(date) ||
            getUTCTimeStamp(maxDate) < getUTCTimeStamp(date)
          }
          className={classNames("date_picker__body--date", {
            "date_picker__body--date--selected": isDateSelected(date),
          })}
          key={index}
          onClick={(event) => selectOption({ originalEvent: event, date })}
        >
          {date.getUTCDate()}
        </option>
      ))}
    </div>
  );
}

export default Calendar;
