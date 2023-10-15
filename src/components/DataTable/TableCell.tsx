import { HTMLAttributes } from "react";
import "./DataTable.scss"

function TableCell({
    ...props
}: HTMLAttributes<HTMLTableCellElement>): JSX.Element {
    return <td {...props}></td>;
}

export default TableCell;
