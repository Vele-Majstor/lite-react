import { InputHTMLAttributes } from "react";
import "../TextInput/TextInput.scss";
declare const TextArea: import("react").ForwardRefExoticComponent<{
    label?: string | undefined;
    helperText?: string | undefined;
    invalid?: boolean | undefined;
    warn?: boolean | undefined;
    light?: boolean | undefined;
    errorMessage?: string | undefined;
} & InputHTMLAttributes<HTMLTextAreaElement> & import("react").RefAttributes<HTMLTextAreaElement>>;
export default TextArea;
