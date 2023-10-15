import { HTMLProps, ReactNode } from "react";
import "./Tooltip.scss";
import { Position } from "./Tooltip.types";
type Props = {
    text: ReactNode;
    position?: Position;
    isShown?: boolean | "" | undefined;
    children: ReactNode;
} & HTMLProps<HTMLDivElement>;
declare function Tooltip({ text, position: requestedPosition, isShown, className, children, style: tooltipStyle, ...other }: Props): JSX.Element;
export default Tooltip;
