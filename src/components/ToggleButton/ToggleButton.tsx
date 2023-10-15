import "./ToggleButton.scss";
import { classNames } from "@/utils/classnames";
import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  forwardRef,
} from "react";

type Props = {
  labelText?: string;
  onLabel?: string;
  offLabel?: string;
  id: string;
  checked: boolean;
  size?: "md" | "sm";
  onChange: (val: {
    event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>;
    value: boolean;
  }) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "checked" | "id" | "size"
>;

const ToggleButton = forwardRef<HTMLInputElement, Props>(
  (
    {
      labelText,
      onLabel,
      offLabel,
      size = "md",
      onChange,
      id,
      className,
      ...other
    },
    ref
  ): JSX.Element => {
    function onEnterOrSpacePressed(event: KeyboardEvent<HTMLInputElement>) {
      if (event.code === "Space" || event.code === "Enter") {
        onChange({ event, value: !(event.target as HTMLInputElement).checked });
      }
    }

    return (
      <div className={classNames("wrapper", className)}>
        <input
          {...other}
          aria-label={undefined}
          type="checkbox"
          id={id}
          className={classNames("toggle_input", {
            "toggle_input--sm": size === "sm",
          })}
          onChange={(event) => {
            onChange({ event, value: event.target.checked });
          }}
          ref={ref}
          onKeyUp={onEnterOrSpacePressed}
        />
        <label
          className={"toggle_input__label"}
          htmlFor={id}
          aria-label={
            typeof labelText === "string" ? undefined : other["aria-label"]
          }
        >
          {labelText}
          <span className={"toggle_input__switch"}>
            {size === "sm" && (
              <svg
                className={"toggle_input__check"}
                width="6px"
                height="5px"
                viewBox="0 0 6 5"
              >
                <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
              </svg>
            )}
            <span className={"toggle_input__text_off"} aria-hidden="true">
              {offLabel}
            </span>
            <span className={"toggle_input__text_on"} aria-hidden="true">
              {onLabel}
            </span>
          </span>
        </label>
      </div>
    );
  }
);

export default ToggleButton;
