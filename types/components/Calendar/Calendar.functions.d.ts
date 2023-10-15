export declare const months: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export declare const days: readonly ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export declare function getDaysInMonthUTC(month: number, year: number): Date[];
export declare function isValidDate(date: any): boolean;
export declare function daysInMonth(month: number, year: number): number;
export declare function createUTCDateFromString(dateString: string): Date;
export declare function matchDateFormat(val: string, regExps?: RegExp[] | RegExp): string | null;
