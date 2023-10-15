import useAccordionContext from "@/hooks/useAccordionContext";
import {
    ComponentClass,
    FunctionComponent,
    MouseEvent,
    ReactNode,
    createRef,
} from "react";
import "./Accordion.scss";
import { classNames } from "@/utils/classnames";
import { CSSTransition } from "react-transition-group";

type ReactElement = string | FunctionComponent<any> | ComponentClass<any>;

type Props<T> = {
    element?: ReactElement;
    eventKey: T;
    onClick?: (event: MouseEvent<ReactElement>) => void;
    children: ReactNode;
    className?: string;
};

function AccordionCollapse<T extends string | number | null>({
    element: Component = "div",
    eventKey,
    children,
    className,
    ...otherProps
}: Props<T>) {
    const { activeEventKey, multiple } = useAccordionContext();
    const ref = createRef<HTMLElement>();
    const other = {
        className: classNames("accordion_collapse", className),
        ref,
        ...otherProps,
    };

    const isVisible = multiple
        ? (activeEventKey as T[])?.includes(eventKey)
        : activeEventKey === eventKey;

    return (
        <CSSTransition
            in={isVisible}
            timeout={{ enter: 1000, exit: 200 }}
            classNames={"scroll"}
            mountOnEnter
            unmountOnExit
            nodeRef={ref}
        >
            <Component {...other}>{children}</Component>
        </CSSTransition>
    );
}

export default AccordionCollapse;
