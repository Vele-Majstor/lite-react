import { KeyboardEvent, MouseEvent } from "react";
import { LabelValue } from "@/type-utils/listbox";
import "./ListBox.scss";
import { ListBoxItemTemplate } from "./ListBox.types";
type Props<T> = {
    option: LabelValue<T>;
    template: ListBoxItemTemplate<T>;
    selectOption: (onClick: {
        option: LabelValue<T>;
        originalEvent: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>;
    }) => void;
    isOptionSelected: (option: LabelValue<T>) => boolean;
};
declare function ListBoxItem<T>({ option, selectOption, template, isOptionSelected, }: Props<T>): JSX.Element;
export default ListBoxItem;
