import { LabelValue } from "@/type-utils/listbox";
import { HTMLAttributes, KeyboardEvent, MouseEvent } from "react";
import "../Dropdown/Dropdown.scss";
import { ListBoxItemTemplate } from "../ListBox/ListBox.types";
type Props<T> = {
    maxSelectedLabels?: number;
    disabled?: boolean;
    placeholder?: string;
    options: LabelValue<T>[];
    value: T[] | null;
    onChange: (value: {
        value: T[] | null;
        event: MouseEvent<HTMLLIElement | HTMLButtonElement> | KeyboardEvent<HTMLLIElement>;
    }) => void;
    showClear?: boolean;
    itemTemplate?: ListBoxItemTemplate<T>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "value">;
declare function MultiSelect<T>({ maxSelectedLabels, disabled, showClear, placeholder, options, onChange, value, className, itemTemplate, ...other }: Props<T>): JSX.Element;
export default MultiSelect;
