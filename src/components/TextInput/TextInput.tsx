import { InputHTMLAttributes, forwardRef } from "react";
import "./TextInput.scss";
import { classNames } from "@/utils/classnames";
import ExclamationTriangle from "@/icons/ExclamationCircle";
import ExclamationCircle from "@/icons/ExclamationTriangle";

type Props = {
  label?: string;
  helperText?: string;
  invalid?: boolean;
  warn?: boolean;
  light?: boolean;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      errorMessage = "A value is required",
      invalid = false,
      warn = false,
      light = false,
      disabled,
      className,
      helperText,
      ...other
    },
    ref
  ): JSX.Element => {
    return (
      <div className={"wrapper"}>
        {label && (
          <label
            htmlFor={id}
            className={classNames("input_label", {
              "input_label-disabled": disabled,
            })}
          >
            {label}
          </label>
        )}
        <div className={"outerFieldWrapper"}>
          <div
            className={"innerFieldWrapper"}
            data-invalid={invalid ?? undefined}
          >
            {!invalid && warn && (
              <span className={"warningIcon"}>
                <ExclamationTriangle />
              </span>
            )}

            {invalid && (
              <span className={"invalidIcon"}>
                <ExclamationCircle />
              </span>
            )}
            <input
              id={id}
              ref={ref}
              disabled={disabled}
              className={classNames("input", className, {
                "input-invalid": invalid,
                "input-light": light,
              })}
              data-invalid={invalid || undefined}
              aria-invalid={invalid || undefined}
              {...other}
            />
          </div>
          {invalid && <div className={"errorMessage"}>{errorMessage}</div>}
          {helperText && !invalid && (
            <div
              className={classNames("helperText", {
                "helperText-disabled": disabled,
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

export default TextInput;
