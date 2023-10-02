import { classNames } from "@/utils/classnames";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import styles from "./TextInput.module.scss";
import Button from "./Button";
import ExclamationCircle from "@/icons/ExclamationTriangle";
import Eye from "@/icons/faEye";
import EyeSlash from "@/icons/EyeSlash";

type Props = {
  label?: string;
  helperText?: string;
  invalid?: boolean;
  light?: boolean;
  errorMessage?: string;
  showToggleButton?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      showToggleButton = true,
      errorMessage = "A value is required",
      invalid = false,
      light = false,
      disabled,
      className,
      helperText,
      ...other
    },
    ref
  ): JSX.Element => {
    const [showPassword, setShowPassword] = useState(true);

    function togglePassword() {
      setShowPassword((prev) => !prev);
    }

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
            <input
              id={id}
              ref={ref}
              disabled={disabled}
              className={classNames(styles.password, className, {
                [styles["password-invalid"]]: invalid,
                [styles["password-light"]]: light,
              })}
              data-invalid={invalid || undefined}
              aria-invalid={invalid || undefined}
              {...other}
              type={showPassword ? "password" : "text"}
            />
            {invalid && (
              <span className={styles["password-invalid--icon"]}>
                <ExclamationCircle />
              </span>
            )}
            {showToggleButton && (
              <Button
                severity="ghost"
                disabled={disabled}
                onClick={togglePassword}
                className={styles.passwordVisibilityToggler}
                icon={showPassword ? <Eye /> : <EyeSlash />}
                iconTooltip="showPassword"
              ></Button>
            )}
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

export default PasswordInput;
