import "./Accordion.scss";
import { ComponentClass, FunctionComponent, MouseEvent, ReactNode } from "react";
type ReactElement = string | FunctionComponent<any> | ComponentClass<any>;
type Props<T> = {
    element?: ReactElement;
    eventKey: T;
    onClick?: (event: MouseEvent<ReactElement>) => void;
    className?: string;
    children: ReactNode;
};
declare function AccordionToggle<T extends string | number | null>({ element: Component, eventKey, onClick, children, className, ...otherProps }: Props<T>): JSX.Element;
export default AccordionToggle;
