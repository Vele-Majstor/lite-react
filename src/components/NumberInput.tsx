import {
  ChangeEvent,
  InputHTMLAttributes,
  MouseEvent,
  forwardRef,
} from "react";
import styles from "./NumberInput.module.scss";
import { classNames } from "@/utils/classnames";
import Minus from "@/icons/Minus";
import Plus from "@/icons/Plus";
import ExclamationTriangle from "@/icons/ExclamationCircle";
import ExclamationCircle from "@/icons/ExclamationTriangle";

type Props = {
  label?: string;
  helperText?: string;
  invalid?: boolean;
  warn?: boolean;
  light?: boolean;
  errorMessage?: string;
  step?: number;
  min?: number;
  max?: number;
  value?: string;
  onChange: (value: {
    event: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>;
    value?: string;
  }) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

const NumberInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      value,
      onChange,
      errorMessage = "A value is required",
      invalid = false,
      warn = false,
      light = false,
      disabled,
      className,
      helperText,
      min = 0,
      max = 100,
      step = 1,
      ...other
    },
    ref
  ): JSX.Element => {
    const capMin = (min: number, value: number) =>
      isNaN(min) ||
      (!min && min !== 0) ||
      isNaN(value) ||
      (!value && value !== 0)
        ? value
        : Math.max(min, value);
    const capMax = (max: number, value: number) =>
      isNaN(max) ||
      (!max && max !== 0) ||
      isNaN(value) ||
      (!value && value !== 0)
        ? value
        : Math.min(max, value);

    function handleArrowClick(
      event: MouseEvent<HTMLButtonElement>,
      direction: "up" | "down"
    ) {
      if (!value) {
        return;
      }
      let convertedValue = typeof value === "string" ? Number(value) : value;

      const conditional =
        direction === "down"
          ? (min !== undefined && convertedValue > min) || min === undefined
          : (max !== undefined && convertedValue < max) || max === undefined;
      if (!disabled && conditional) {
        convertedValue =
          direction === "down" ? convertedValue - step : convertedValue + step;
        convertedValue = capMax(max, capMin(min, convertedValue));

        onChange({ event, value: String(convertedValue) });
      }
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.outerFieldWrapper}>
          {label && (
            <label
              htmlFor={id}
              className={classNames(styles.label, {
                [styles["label-disabled"]]: disabled,
              })}
            >
              {label}
            </label>
          )}
          <div
            className={styles.innerFieldWrapper}
            data-invalid={invalid ?? undefined}
          >
            <input
              id={id}
              ref={ref}
              value={value}
              onChange={(event) =>
                onChange({ event, value: event.target.value })
              }
              min={min}
              max={max}
              step={step}
              pattern="[0-9]*"
              disabled={disabled}
              className={classNames(styles.number_input, className, {
                [styles["number_input-invalid"]]: invalid,
                [styles["number_input-light"]]: light,
              })}
              data-invalid={invalid || undefined}
              aria-invalid={invalid || undefined}
              type="number"
              {...other}
            />
            {!invalid && warn && (
              <span className={styles.warningIcon}>
                <ExclamationTriangle />
              </span>
            )}
            {invalid && (
              <span className={styles.invalidIcon}>
                <ExclamationCircle />
              </span>
            )}
            <div className={styles.number_input_number__controls}>
              <button
                type="button"
                onClick={(event) => {
                  handleArrowClick(event, "down");
                }}
                className={classNames(
                  styles["number_input_number__control-btn"],
                  styles["number_input_number__control-btn_down"]
                )}
                tabIndex={-1}
              >
                <Minus />
              </button>
              <div
                className={styles.number_input_rule_divider}
                style={warn || invalid ? {} : { background: "#0000" }}
              />
              <button
                type="button"
                onClick={(event) => {
                  handleArrowClick(event, "up");
                }}
                className={classNames(
                  styles["number_input_number__control-btn"],
                  styles["number_input_number__control-btn_up"]
                )}
                tabIndex={-1}
              >
                <Plus />
              </button>
              <div className={styles.number_input_rule_divider} />
            </div>
          </div>
          {invalid && <div className={styles.errorMessage}>{errorMessage}</div>}
          {helperText && !invalid && (
            <div
              className={classNames(styles.helperText, {
                [styles["helperText-disabled"]]: disabled,
              })}
            >
              {helperText}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default NumberInput;
