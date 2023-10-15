import { ReactNode, Dispatch, SetStateAction } from "react";
import { Size } from "./Table.types";
import "./DataTable.scss";
type Header = {
    key: string;
    header: ReactNode;
    isSortable?: boolean;
};
type Props = {
    selectionMode?: boolean;
    selection?: (unknown | object | any)[] | null;
    setSelection?: Dispatch<SetStateAction<(unknown | object | any)[] | null>>;
    headers: Header[];
    rows: (unknown | object | any)[] & {
        _disabled?: boolean;
        _selected?: boolean;
    };
    size?: Size;
    stickyHeader?: boolean;
    staticWidth?: boolean;
    zebraStyles?: boolean;
    locale?: string;
    title?: string;
    description?: string;
};
declare function DataTable({ selectionMode, selection, setSelection, headers, rows, size, stickyHeader, staticWidth, zebraStyles, locale, }: Props): import("react/jsx-runtime").JSX.Element;
export default DataTable;
