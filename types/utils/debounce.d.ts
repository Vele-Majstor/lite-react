export declare const debounce: (func: (...args: any) => any, wait?: number) => {
    (...args: any): void;
    cancel(): void;
};
