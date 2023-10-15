import { HTMLAttributes } from "react";
import "./DataTable.scss";
type Props = {
    className?: string;
    isSelected?: boolean;
} & HTMLAttributes<HTMLTableRowElement>;
declare function TableRow({ className, isSelected, ...rest }: Props): import("react/jsx-runtime").JSX.Element;
export default TableRow;
