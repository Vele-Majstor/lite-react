import { InputHTMLAttributes, forwardRef, useContext } from "react";
import "./RadioButton.scss";
import { classNames } from "@/utils/classnames";
import { RadioGroupContext } from "../RadioButtonGroup/RadioButtonGroup";

type Props = {
  labelText?: string;
  position?: "left" | "right";
} & InputHTMLAttributes<HTMLInputElement>;

const RadioButton = forwardRef<HTMLInputElement, Props>(
  ({ labelText, position: propPosition, id, ...other }, ref): JSX.Element => {
    const { position: contextPosition } = useContext(RadioGroupContext);
    const position = propPosition || contextPosition;

    return (
      <div className={"wrapper"}>
        <input
          {...other}
          type="radio"
          className={"radio_button"}
          id={id}
          ref={ref}
        />
        <label
          htmlFor={id}
          className={classNames("radio_button__label", {
            [`radio_button__label--${position}`]: position,
          })}
        >
          <span className={"radio_button__appearance"} />
          {labelText && (
            <span className={"radio_buttonn__label_text"}>{labelText}</span>
          )}
        </label>
      </div>
    );
  }
);

export default RadioButton;
