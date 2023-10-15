import { ComponentClass, FunctionComponent, MouseEvent, ReactNode } from "react";
import "./Accordion.scss";
type ReactElement = string | FunctionComponent<any> | ComponentClass<any>;
type Props<T> = {
    element?: ReactElement;
    eventKey: T;
    onClick?: (event: MouseEvent<ReactElement>) => void;
    children: ReactNode;
    className?: string;
};
declare function AccordionCollapse<T extends string | number | null>({ element: Component, eventKey, children, className, ...otherProps }: Props<T>): import("react/jsx-runtime").JSX.Element;
export default AccordionCollapse;
