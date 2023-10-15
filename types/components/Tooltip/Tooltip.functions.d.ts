import { CSSProperties, RefObject } from "react";
import { Position } from "./Tooltip.types";
export declare function getPossiblePosition(requestedPosition: Position, parentRef: RefObject<HTMLDivElement>, textRef: RefObject<HTMLDivElement>): Position;
export declare function getStyle(position: Position, parentRef: RefObject<HTMLDivElement>, textRef: RefObject<HTMLDivElement>): CSSProperties;
