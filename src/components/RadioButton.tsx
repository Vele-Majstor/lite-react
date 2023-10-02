import { InputHTMLAttributes, forwardRef, useContext } from "react";
import styles from "./RadioButton.module.scss";
import { classNames } from "@/utils/classnames";
import { RadioGroupContext } from "./RadioButtonGroup";

type Props = {
  labelText?: string;
  position?: "left" | "right";
} & InputHTMLAttributes<HTMLInputElement>;

const RadioButton = forwardRef<HTMLInputElement, Props>(
  ({ labelText, position: propPosition, id, ...other }, ref): JSX.Element => {
    const { position: contextPosition } = useContext(RadioGroupContext);
    const position = propPosition || contextPosition;

    return (
      <div className={styles.wrapper}>
        <input
          {...other}
          type="radio"
          className={styles.radio_button}
          id={id}
          ref={ref}
        />
        <label
          htmlFor={id}
          className={classNames(styles.radio_button__label, {
            [styles[`radio_button__label--${position}`]]: position,
          })}
        >
          <span className={styles.radio_button__appearance} />
          {labelText && (
            <span className={styles.radio_buttonn__label_text}>
              {labelText}
            </span>
          )}
        </label>
      </div>
    );
  }
);

export default RadioButton;
