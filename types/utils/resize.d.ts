export declare function getResizeObserver(cb: (...args: any) => void): {
    resizeObserver: ResizeObserver | MutationObserver;
    observe: ((el: Element) => void) | undefined;
};
