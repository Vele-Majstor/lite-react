import { HTMLAttributes } from "react";

function TableCell({
  ...props
}: HTMLAttributes<HTMLTableCellElement>): JSX.Element {
  return <td {...props}></td>;
}

export default TableCell;
