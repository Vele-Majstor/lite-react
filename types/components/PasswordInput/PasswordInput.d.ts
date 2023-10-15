import { InputHTMLAttributes } from "react";
import "../TextInput/TextInput.scss";
declare const PasswordInput: import("react").ForwardRefExoticComponent<{
    label?: string | undefined;
    helperText?: string | undefined;
    invalid?: boolean | undefined;
    light?: boolean | undefined;
    errorMessage?: string | undefined;
    showToggleButton?: boolean | undefined;
} & InputHTMLAttributes<HTMLInputElement> & import("react").RefAttributes<HTMLInputElement>>;
export default PasswordInput;
