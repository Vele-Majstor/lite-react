import { RefObject } from "react";
export declare function useModalPosition(containerRef: RefObject<HTMLDivElement>, modalRef: RefObject<HTMLUListElement>, visible: boolean, onHide: (...args: any) => void): {
    position: {
        top?: string | undefined;
        left?: string | undefined;
        right?: string | undefined;
        bottom?: string | undefined;
    };
};
export declare function getPossiblePosition(containerRef: RefObject<HTMLDivElement>, modalRef: RefObject<HTMLUListElement>): {
    top?: undefined;
    left?: undefined;
    width?: undefined;
    position?: undefined;
} | {
    top: string;
    left: string;
    width: string;
    position: string;
};
export declare function useHandleOutsideClick(containerRef: RefObject<HTMLDivElement>, modalRef: RefObject<HTMLUListElement>, cb: () => void): void;
