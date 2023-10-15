import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";
import "./Checkbox.scss";

type Props = {
  indeterminate?: boolean;
  label?: string;
  id: string;
  checked: boolean;
  onChange: (event: {
    checked: boolean;
    event: ChangeEvent<HTMLInputElement>;
  }) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked" | "id">;

const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    { indeterminate = false, label, id, title, onChange, ...other },
    ref
  ): JSX.Element => {
    return (
      <div className={"wrapper"}>
        <input
          {...other}
          type="checkbox"
          onChange={(event) => {
            onChange({ checked: event.target.checked, event });
          }}
          className={"checkbox"}
          id={id}
          ref={(el) => {
            if (el) {
              el.indeterminate = indeterminate;
            }
            if (typeof ref === "function") {
              ref(el);
            } else if (ref && Object(ref) === ref) {
              ref.current = el;
            }
          }}
        />
        <label htmlFor={id} className={"label"} title={title}>
          {label && <span className={"label_text"}>{label}</span>}
        </label>
      </div>
    );
  }
);

export default Checkbox;
