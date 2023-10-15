import { LabelValue } from "@/type-utils/listbox";
import { HTMLAttributes, KeyboardEvent, MouseEvent } from "react";
import "./Dropdown.scss";
import { ListBoxItemTemplate } from "../ListBox/ListBox.types";
type Props<T> = {
    disabled?: boolean;
    placeholder?: string;
    options: LabelValue<T>[];
    value: T | null;
    onChange: (value: {
        value: T | null;
        event: MouseEvent<HTMLLIElement | HTMLButtonElement> | KeyboardEvent<HTMLLIElement>;
    }) => void;
    showClear?: boolean;
    itemTemplate?: ListBoxItemTemplate<T>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "value">;
declare function Dropdown<T>({ disabled, showClear, placeholder, options, onChange, value, className, itemTemplate, ...other }: Props<T>): JSX.Element;
export default Dropdown;
