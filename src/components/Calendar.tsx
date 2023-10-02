import styles from "./Calendar.module.scss";
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
  months,
} from "./Calendar.functions";
import { classNames } from "@/utils/classnames";
import ChevronRight from "@/icons/ChevronRight";
import ChevronLeft from "@/icons/ChevronLeft";

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
        <div ref={calendarRef} className={styles.date_picker__modal} {...other}>
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
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  function getTimeFromState(_day: number) {
    return new Date(currentYear, currentMonth, _day).getTime();
  }

  return (
    <div tabIndex={0} className={styles.date_picker__header}>
      <button
        disabled={minDate.getTime() > getTimeFromState(1)}
        onClick={prevMonth}
        className={styles["date_picker__header--icon"]}
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
        className={styles["date_picker__header--icon"]}
      >
        <ChevronRight />
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
    <div className={styles.date_picker__body}>
      {days.map((day) => (
        <span key={day}>{day}</span>
      ))}
      {getDaysInMonthUTC(currentMonth, currentYear).map((date, index) => (
        <option
          tabIndex={0}
          disabled={
            date.getUTCMonth() !== currentMonth ||
            minDate.getTime() > date.getTime() ||
            maxDate.getTime() < date.getTime()
          }
          className={classNames(styles["date_picker__body--date"], {
            [styles["date_picker__body--date--selected"]]: isDateSelected(date),
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
