/// <reference types="react" />
declare const useAccordionContext: () => {
    activeEventKey: string | number | (string | number | null)[] | null;
    onToggle: import("react").Dispatch<import("react").SetStateAction<string | number | null>> | import("react").Dispatch<import("react").SetStateAction<(string | number | null)[]>>;
    multiple: boolean;
};
export default useAccordionContext;
