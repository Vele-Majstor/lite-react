export function elementOrParentIsFloatingMenu(
    node: HTMLElement,
    dataAttributes: string[] = []
) {
    if (node && typeof node.closest === "function") {
        const allDataAttributes = [
            "data-listbox-menu",
            "data-tooltip",
            ...dataAttributes,
        ];
        return allDataAttributes.some((dataAttr) => node.closest(`[${dataAttr}]`));
    }
}
