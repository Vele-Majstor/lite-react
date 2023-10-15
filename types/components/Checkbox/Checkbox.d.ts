import { ChangeEvent, InputHTMLAttributes } from "react";
import "./Checkbox.scss";
declare const Checkbox: import("react").ForwardRefExoticComponent<{
    indeterminate?: boolean | undefined;
    label?: string | undefined;
    id: string;
    checked: boolean;
    onChange: (event: {
        checked: boolean;
        event: ChangeEvent<HTMLInputElement>;
    }) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "checked" | "id" | "onChange"> & import("react").RefAttributes<HTMLInputElement>>;
export default Checkbox;
