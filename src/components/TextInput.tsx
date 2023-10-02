import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./TextInput.module.scss";
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
      <div className={styles.wrapper}>
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
        <div className={styles.outerFieldWrapper}>
          <div
            className={styles.innerFieldWrapper}
            data-invalid={invalid ?? undefined}
          >
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
            <input
              id={id}
              ref={ref}
              disabled={disabled}
              className={classNames(styles.input, className, {
                [styles["input-invalid"]]: invalid,
                [styles["input-light"]]: light,
              })}
              data-invalid={invalid || undefined}
              aria-invalid={invalid || undefined}
              {...other}
            />
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

export default TextInput;
