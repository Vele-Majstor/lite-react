import { InputHTMLAttributes } from "react";
import "./RadioButton.scss";
declare const RadioButton: import("react").ForwardRefExoticComponent<{
    labelText?: string | undefined;
    position?: "right" | "left" | undefined;
} & InputHTMLAttributes<HTMLInputElement> & import("react").RefAttributes<HTMLInputElement>>;
export default RadioButton;
