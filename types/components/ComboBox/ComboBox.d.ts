import { LabelValue } from "@/type-utils/listbox";
import { HTMLAttributes, KeyboardEvent, MouseEvent } from "react";
import "@/components/Dropdown/Dropdown.scss";
import { ListBoxItemTemplate } from "../ListBox/ListBox.types";
type Props<T> = {
    loading?: boolean;
    disabled?: boolean;
    placeholder?: string;
    options: LabelValue<T>[];
    filterBy?: "label" | "value";
    value: T | null;
    filterValue: string;
    onChangeFilterValue: (filterValue: string) => void;
    onChange: (value: {
        value: T | null;
        event: MouseEvent<HTMLLIElement | HTMLButtonElement> | KeyboardEvent<HTMLLIElement>;
    }) => void;
    showClear?: boolean;
    itemTemplate?: ListBoxItemTemplate<T>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "value">;
declare function ComboBox<T>({ loading, disabled, showClear, placeholder, options, filterBy, onChange, onChangeFilterValue, value, filterValue, className, itemTemplate, ...other }: Props<T>): JSX.Element;
export default ComboBox;
