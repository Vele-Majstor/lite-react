import { CSSProperties, RefObject } from "react";

import { Position } from "./Tooltip.types";

const arrowSize = 7;
const spacing = 8;
const bufferTop = 48;

function getLeftPosition(
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): CSSProperties {
    const parentRect = parentRef.current?.getBoundingClientRect();
    const textRect = textRef.current?.getBoundingClientRect();

    if (!parentRect || !textRect) {
        return {};
    }

    const top =
        parentRect.top +
        parentRect.height / 2 -
        textRect.height / 2 +
        window.scrollY;

    const left =
        parentRect.left - textRect.width - arrowSize - spacing + window.scrollX;

    return { top: top || 0, left: left || 0 };
}

function getRightPosition(
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): CSSProperties {
    const parentRect = parentRef.current?.getBoundingClientRect();
    const textRect = textRef.current?.getBoundingClientRect();

    if (!parentRect || !textRect) {
        return {};
    }

    const top =
        parentRect.top +
        parentRect.height / 2 -
        textRect.height / 2 +
        window.scrollY;

    const left = parentRect.right + arrowSize + spacing + window.scrollX;

    return { top: top || 0, left: left || 0 };
}

function getTopPosition(
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): CSSProperties {
    const parentRect = parentRef.current?.getBoundingClientRect();
    const textRect = textRef.current?.getBoundingClientRect();

    if (!parentRect || !textRect) {
        return {};
    }

    const top =
        parentRect.top - textRect.height - arrowSize - spacing + window.scrollY;

    const left =
        parentRect.left +
        parentRect.width / 2 -
        textRect.width / 2 +
        window.scrollX;

    return { top: top || 0, left: left || 0 };
}

function getBottomPosition(
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): CSSProperties {
    const parentRect = parentRef.current?.getBoundingClientRect();
    const textRect = textRef.current?.getBoundingClientRect();

    if (!parentRect || !textRect) {
        return {};
    }

    const top = parentRect.bottom + arrowSize + spacing + window.scrollY;
    const left =
        parentRect.left +
        parentRect.width / 2 -
        textRect.width / 2 +
        window.scrollX;

    return { top: top || 0, left: left || 0 };
}

function tryLeft(
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): boolean {
    const leftPosition = getLeftPosition(parentRef, textRef);

    return window.scrollX <= parseInt(leftPosition.left?.toString() ?? "0");
}

function tryRight(
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): boolean {
    const textRect = textRef.current?.getBoundingClientRect();

    if (!textRect) {
        return false;
    }

    const rightPosition = getRightPosition(parentRef, textRef);
    const textRectRightmostX =
        parseInt(rightPosition.left?.toString() ?? "0") +
        textRect.width +
        arrowSize +
        spacing;
    const rightmostVisibleXPos = window.scrollX + window.innerWidth;

    return textRectRightmostX <= rightmostVisibleXPos;
}

function tryTop(
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): boolean {
    const topPosition = getTopPosition(parentRef, textRef);

    return (
        window.scrollY + bufferTop <= parseInt(topPosition.top?.toString() ?? "0")
    );
}

function tryBottom(
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): boolean {
    const textRect = textRef.current?.getBoundingClientRect();

    if (!textRect) {
        return false;
    }

    const bottomPosition = getBottomPosition(parentRef, textRef);
    const textRectBottommostY =
        parseInt(bottomPosition.top?.toString() ?? "0") + textRect.height;

    const bottommostVisibleYPos = window.scrollY + window.innerHeight;

    return textRectBottommostY <= bottommostVisibleYPos;
}

export function getPossiblePosition(
    requestedPosition: Position,
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): Position {
    switch (requestedPosition) {
        case "top":
            return tryTop(parentRef, textRef)
                ? requestedPosition
                : tryLeft(parentRef, textRef)
                    ? "left"
                    : tryRight(parentRef, textRef)
                        ? "right"
                        : tryBottom(parentRef, textRef)
                            ? "bottom"
                            : requestedPosition;

        case "bottom":
            return tryBottom(parentRef, textRef)
                ? requestedPosition
                : tryTop(parentRef, textRef)
                    ? "top"
                    : tryLeft(parentRef, textRef)
                        ? "left"
                        : tryRight(parentRef, textRef)
                            ? "right"
                            : requestedPosition;

        case "left":
            return tryLeft(parentRef, textRef)
                ? requestedPosition
                : tryTop(parentRef, textRef)
                    ? "top"
                    : tryRight(parentRef, textRef)
                        ? "right"
                        : tryBottom(parentRef, textRef)
                            ? "bottom"
                            : requestedPosition;

        case "right":
            return tryRight(parentRef, textRef)
                ? requestedPosition
                : tryTop(parentRef, textRef)
                    ? "top"
                    : tryLeft(parentRef, textRef)
                        ? "left"
                        : tryBottom(parentRef, textRef)
                            ? "bottom"
                            : requestedPosition;
    }
}

export function getStyle(
    position: Position,
    parentRef: RefObject<HTMLDivElement>,
    textRef: RefObject<HTMLDivElement>
): CSSProperties {
    switch (position) {
        case "top":
            return getTopPosition(parentRef, textRef);
        case "bottom":
            return getBottomPosition(parentRef, textRef);
        case "left":
            return getLeftPosition(parentRef, textRef);
        case "right":
            return getRightPosition(parentRef, textRef);
    }
}
