import { classNames } from "@/utils/classnames";
import {
  CSSProperties,
  HTMLProps,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

import { getPossiblePosition, getStyle } from "./Tooltip.functions";
import styles from "./Tooltip.module.scss";
import { Position } from "./Tooltip.types";

type Props = {
  text: ReactNode;
  position?: Position;
  isShown?: boolean | "" | undefined;
  children: ReactNode;
} & HTMLProps<HTMLDivElement>;

function Tooltip({
  text,
  position: requestedPosition = "right",
  isShown = true,
  className,
  children,
  style: tooltipStyle,
  ...other
}: Props): JSX.Element {
  const [isHovering, setIsHovering] = useState(false);
  const [style, setStyle] = useState<CSSProperties | undefined>();

  const parentRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLDivElement>(null);

  const position = getPossiblePosition(
    requestedPosition,
    parentRef,
    tooltipTextRef
  );

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  useLayoutEffect(() => {
    setStyle(
      isHovering ? getStyle(position, parentRef, tooltipTextRef) : undefined
    );
  }, [isHovering, position]);

  const tooltipPortalContainer =
    document.getElementById("tooltip-portal-container") || document.body;

  if (tooltipPortalContainer === document.body) {
    new Error("Tooltip container element not found!");
  }

  return (
    <div
      data-tooltip
      ref={parentRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(styles.tooltip, className)}
      {...other}
    >
      {children}
      {isHovering &&
        isShown &&
        ReactDOM.createPortal(
          <div
            ref={tooltipTextRef}
            className={classNames(
              styles.tooltipText,
              styles[position],
              "p-p-2",
              {
                [styles.visible]: isHovering,
              }
            )}
            style={{ ...style, ...tooltipStyle }}
          >
            {text}
          </div>,
          tooltipPortalContainer
        )}
    </div>
  );
}

export default Tooltip;
