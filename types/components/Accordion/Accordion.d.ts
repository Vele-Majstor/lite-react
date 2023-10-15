import { ComponentClass, Dispatch, FunctionComponent, ReactNode, SetStateAction } from "react";
type ReactElement = string | FunctionComponent<any> | ComponentClass<any>;
type Props<T> = {
    element?: ReactElement;
    activeEventKey: T[] | null;
    multiple: true;
    onToggle: Dispatch<SetStateAction<T[] | null>>;
    children: ReactNode;
} | {
    element?: ReactElement;
    activeEventKey: T | null;
    multiple?: false;
    onToggle: Dispatch<SetStateAction<T | null>>;
    children: ReactNode;
} | {
    element?: ReactElement;
    children: ReactNode;
    multiple?: boolean;
    onToggle?: never;
    activeEventKey?: never;
};
declare function Accordion<T extends string | number | null>({ element: Component, activeEventKey, onToggle, multiple, children, ...other }: Props<T>): JSX.Element;
export default Accordion;
