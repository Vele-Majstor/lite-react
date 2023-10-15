import { InputHTMLAttributes } from "react";
import "./TextInput.scss";
declare const TextInput: import("react").ForwardRefExoticComponent<{
    label?: string | undefined;
    helperText?: string | undefined;
    invalid?: boolean | undefined;
    warn?: boolean | undefined;
    light?: boolean | undefined;
    errorMessage?: string | undefined;
} & InputHTMLAttributes<HTMLInputElement> & import("react").RefAttributes<HTMLInputElement>>;
export default TextInput;
