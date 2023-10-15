import { ReactNode, createContext } from "react";
import "./RadioButtonGroup.scss";
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
      <div className={"wrapper"}>
        <fieldset
          className={classNames("radio_button_group", {
            [`radio-button-group--${orientation}`]: orientation,
          })}
        >
          {legendText && (
            <legend className={"radio_group__legend_text"}>{legendText}</legend>
          )}
          {children}
        </fieldset>
      </div>
    </RadioGroupContext.Provider>
  );
}

export default RadioButtonGroup;
