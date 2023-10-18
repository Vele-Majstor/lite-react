export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const matchMonthName =
    /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b/;
const matchDay = /0?[1-9]|[12][0-9]|3[01]/;
const matchMonth = /0?[1-9]|1[012]/;
const matchYear = /\d{4}/;

const separator = /[- /.]/;

const validDateFormatsRegExp = [
    // MM/DD/YYYY
    new RegExp(
        `^(${matchMonth.source}|${matchMonthName.source})${separator.source}(${matchDay.source})${separator.source}${matchYear.source}$`,
        "i"
    ),
    // YYYY/MM/DD
    new RegExp(
        `^${matchYear.source}${separator.source}(${matchMonth.source}|${matchMonthName.source})${separator.source}(${matchDay.source})$`,
        "i"
    ),
    // DD/MM(abbr)/YYYY
    new RegExp(
        `^(${matchDay.source})${separator.source}(${matchMonthName.source})${separator.source}${matchYear.source}$`,
        "i"
    ),
    // YYYY/DD/MM(abbr)
    new RegExp(
        `^${matchYear.source}${separator.source}(${matchDay.source})${separator.source}(${matchMonthName.source})$`,
        "i"
    ),
    // YYYY/MM(abbr)
    new RegExp(
        `^${matchYear.source}${separator.source}(${matchMonthName.source})$`,
        "i"
    ),
    // MM(abbr)/YYYY
    new RegExp(
        `^(${matchMonthName.source})${separator.source}${matchYear.source}$`,
        "i"
    ),
];

const unSupportedDateFormatsRegExp = [
    // DD/MM/YYYY
    new RegExp(
        `^(?<day>${matchDay.source})${separator.source}(?<month>${matchMonth.source})${separator.source}${matchYear.source}$`
    ),
    // YYYY/DD/MM
    new RegExp(
        `^${matchYear.source}${separator.source}(?<day>${matchDay.source})${separator.source}(?<month>${matchMonth.source})$`
    ),
];

function cloneDate(date: Date) {
    return isValidDate(date) ? new Date(date.valueOf()) : date;
}

export function getDaysInMonthUTC(month: number, year: number) {
    const date = new Date(Date.UTC(year, month, 1));

    const prevMonthDays = [];
    if (date.getUTCDay()) {
        for (let i = 1; i <= date.getUTCDay(); i++) {
            const tempDate = cloneDate(date);
            tempDate.setUTCDate(tempDate.getUTCDate() - i);
            prevMonthDays.unshift(tempDate);
        }
    }

    const currMonthDays = [];
    while (date.getUTCMonth() === month) {
        currMonthDays.push(new Date(date));
        date.setUTCDate(date.getUTCDate() + 1);
    }

    date.setUTCDate(date.getUTCDate() - 1);
    const nextMonthDays = [];
    if (date.getUTCDay() !== 6) {
        for (let i = 1; i <= Math.abs(date.getUTCDay() - 6); i++) {
            const tempDate = cloneDate(date);
            tempDate.setUTCDate(tempDate.getUTCDate() + i);
            nextMonthDays.push(tempDate);
        }
    }

    return prevMonthDays.concat(currMonthDays.concat(nextMonthDays));
}

export function isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
}

export function getUTCTimeStamp(date: Date) {
    return Math.floor(date.getTime() / 1000);
}

export function daysInMonth(month: number, year: number) {
    return new Date(Date.UTC(year, month, 1)).getUTCDate();
}

export function createUTCDateFromString(dateString: string) {
    const dateVal = new Date(dateString);
    const dateUTCVal = new Date(
        Date.UTC(
            dateVal.getFullYear(),
            dateVal.getMonth(),
            dateVal.getDate(),
            dateVal.getHours(),
            dateVal.getMinutes(),
            dateVal.getSeconds()
        )
    );
    return dateUTCVal;
}

export function matchDateFormat(val: string, regExps?: RegExp[] | RegExp) {
    if (regExps) {
        const transformedPropRegExp = Array.isArray(regExps) ? regExps : [regExps];
        validDateFormatsRegExp.concat(transformedPropRegExp);
    }

    if (validDateFormatsRegExp.some((regExp) => val.match(regExp))) {
        return val;
    }

    let unSupportedFormatMatch: RegExpMatchArray | null = null;

    for (let i = 0; i < unSupportedDateFormatsRegExp.length; i++) {
        unSupportedFormatMatch = val.match(unSupportedDateFormatsRegExp[i].source);
        if (unSupportedFormatMatch) {
            break;
        }
    }

    if (unSupportedFormatMatch) {
        const valSeparator = val.match(separator.source)![0];
        const slicedVal = val.split(valSeparator);
        const dayIndex = slicedVal.findIndex(
            (slice) =>
                slice === (unSupportedFormatMatch as RegExpMatchArray).groups!.day
        );
        const monthIndex = slicedVal.findIndex(
            (slice) =>
                slice === (unSupportedFormatMatch as RegExpMatchArray).groups!.month
        );

        const temp = slicedVal[dayIndex];
        slicedVal[dayIndex] = slicedVal[monthIndex];
        slicedVal[monthIndex] = temp;

        return slicedVal.join(valSeparator);
    }

    return null;
}
