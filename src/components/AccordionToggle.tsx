import useAccordionContext from "@/hooks/useAccordionContext";
import { classNames } from "@/utils/classnames";
import styles from "./Accordion.module.scss";
import {
  ComponentClass,
  FunctionComponent,
  MouseEvent,
  ReactNode,
} from "react";

type ReactElement = string | FunctionComponent<any> | ComponentClass<any>;

type Props<T> = {
  element?: ReactElement;
  eventKey: T;
  onClick?: (event: MouseEvent<ReactElement>) => void;
  className?: string;
  children: ReactNode;
};

const useAccordionClick = (
  eventKey: string | number | null,
  onClick?: (event: MouseEvent<ReactElement>) => void
) => {
  const { onToggle } = useAccordionContext();
  return (event: MouseEvent<ReactElement>) => {
    onToggle(eventKey as any);
    if (onClick) {
      onClick(event);
    }
  };
};

function AccordionToggle<T extends string | number | null>({
  element: Component = "div",
  eventKey,
  onClick,
  children,
  className,
  ...otherProps
}: Props<T>): JSX.Element {
  const accordionClick = useAccordionClick(eventKey, onClick);
  return (
    <Component
      {...otherProps}
      onClick={accordionClick}
      className={classNames(styles.accordion_toggle, className)}
    >
      {children}
    </Component>
  );
}

export default AccordionToggle;
