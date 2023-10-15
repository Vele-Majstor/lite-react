import { ChangeEvent, InputHTMLAttributes, MouseEvent } from "react";
import "./NumberInput.scss";
declare const NumberInput: import("react").ForwardRefExoticComponent<{
    label?: string | undefined;
    helperText?: string | undefined;
    invalid?: boolean | undefined;
    warn?: boolean | undefined;
    light?: boolean | undefined;
    errorMessage?: string | undefined;
    step?: number | undefined;
    min?: number | undefined;
    max?: number | undefined;
    value?: string | undefined;
    onChange: (value: {
        event: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>;
        value?: string | undefined;
    }) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & import("react").RefAttributes<HTMLInputElement>>;
export default NumberInput;
