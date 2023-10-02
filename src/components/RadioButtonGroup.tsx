import { ReactNode, createContext } from "react";
import styles from "./RadioButtonGroup.module.scss";
import { classNames } from "@/utils/classnames";

export const RadioGroupContext = createContext({ position: "right" });

type Props = {
  position?: "left" | "right";
  orientation?: "horizontal" | "vertical";
  legendText?: string;
  children: ReactNode;
};

function RadioButtonGroup({
  children,
  orientation,
  legendText,
  position = "right",
}: Props): JSX.Element {
  return (
    <RadioGroupContext.Provider value={{ position }}>
      <div className={styles.wrapper}>
        <fieldset
          className={classNames(styles.radio_button_group, {
            [styles[`radio-button-group--${orientation}`]]: orientation,
          })}
        >
          {legendText && (
            <legend className={styles.radio_group__legend_text}>
              {legendText}
            </legend>
          )}
          {children}
        </fieldset>
      </div>
    </RadioGroupContext.Provider>
  );
}

export default RadioButtonGroup;
