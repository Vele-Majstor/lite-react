export const compare = (a, b, locale = "en") => {
    if (typeof a === "number" && typeof b === "number") {
        return a - b;
    }

    if (typeof a === "string" && typeof b === "string") {
        return compareStrings(a, b, locale);
    }

    return compareStrings("" + a, "" + b, locale);
};

export const compareStrings = (a, b, locale = "en") => {
    if (!isNaN(a) && !isNaN(parseFloat(a))) {
        return a.localeCompare(b, locale, { numeric: true });
    }

    return a.localeCompare(b, locale);
};

export const defaultSortRow = (
    cellA,
    cellB,
    { sortDirection, sortStates, locale }
) => {
    if (sortDirection === sortStates.ASC) {
        return compare(cellA, cellB, locale);
    }

    return compare(cellB, cellA, locale);
};
