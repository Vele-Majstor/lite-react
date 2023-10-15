import "./ToggleButton.scss";
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from "react";
declare const ToggleButton: import("react").ForwardRefExoticComponent<{
    labelText?: string | undefined;
    onLabel?: string | undefined;
    offLabel?: string | undefined;
    id: string;
    checked: boolean;
    size?: "sm" | "md" | undefined;
    onChange: (val: {
        event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>;
        value: boolean;
    }) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "checked" | "size" | "id" | "onChange"> & import("react").RefAttributes<HTMLInputElement>>;
export default ToggleButton;
