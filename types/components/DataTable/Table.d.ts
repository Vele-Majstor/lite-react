import { HTMLAttributes } from "react";
import { Size } from "./Table.types";
import "./DataTable.scss";
type Props = {
    className?: string;
    isSortable?: boolean;
    overflowMenuOnHover?: boolean;
    size?: Size;
    stickyHeader?: boolean;
    staticWidth?: boolean;
    zebraStyles?: boolean;
} & HTMLAttributes<HTMLTableElement>;
declare function Table({ className, children, zebraStyles, size, isSortable, staticWidth, stickyHeader, overflowMenuOnHover, ...other }: Props): JSX.Element;
export default Table;
