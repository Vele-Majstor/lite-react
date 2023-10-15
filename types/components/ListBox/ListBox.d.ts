import { LabelValue } from "@/type-utils/listbox";
import { ForwardedRef, HTMLAttributes } from "react";
import "./ListBox.scss";
import { ListBoxItemTemplate, MultipleSelectProps, SingleSelectProps } from "./ListBox.types";
import "@/styles/transitions.scss";
type Props<T> = {
    loading?: boolean;
    options: LabelValue<T>[] | null;
    itemTemplate?: ListBoxItemTemplate<T>;
    visible?: boolean;
} & (SingleSelectProps<T> | MultipleSelectProps<T>) & Omit<HTMLAttributes<HTMLUListElement>, "value" | "onChange">;
declare function ListBox<T>({ loading, multiple, visible, value, options, onChange, itemTemplate, className, ...other }: Props<T>, ref: ForwardedRef<HTMLUListElement>): JSX.Element;
declare const _default: <T>(props: Props<T> & {
    ref?: ForwardedRef<HTMLUListElement> | undefined;
}) => ReturnType<typeof ListBox>;
export default _default;
