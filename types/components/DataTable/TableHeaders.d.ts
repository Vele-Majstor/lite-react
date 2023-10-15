import { HTMLAttributes } from "react";
import { ReactNode } from "react";
import "./DataTable.scss";
type Props = {
    header: {
        key: string;
        header: ReactNode;
        isSortable?: boolean;
    };
    colSpan?: number;
    scope?: string;
    sortDirection?: string;
    isSortHeader?: boolean;
} & HTMLAttributes<HTMLTableCellElement>;
declare function TableHeaders({ onClick, scope, colSpan, header, sortDirection, isSortHeader, id, className, children, ...other }: Props): JSX.Element;
export default TableHeaders;
