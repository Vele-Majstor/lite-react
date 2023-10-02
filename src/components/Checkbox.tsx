import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";
import styles from "./Checkbox.module.scss";

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
      <div className={styles.wrapper}>
        <input
          {...other}
          type="checkbox"
          onChange={(event) => {
            onChange({ checked: event.target.checked, event });
          }}
          className={styles.checkbox}
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
        <label htmlFor={id} className={styles.label} title={title}>
          {label && <span className={styles.label_text}>{label}</span>}
        </label>
      </div>
    );
  }
);

export default Checkbox;
