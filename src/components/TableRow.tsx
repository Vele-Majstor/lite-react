import { classNames } from "@/utils/classnames";
import { HTMLAttributes } from "react";
import "./DataTable.scss";

type Props = {
  className?: string;
  isSelected?: boolean;
} & HTMLAttributes<HTMLTableRowElement>;

function TableRow({ className, isSelected, ...rest }: Props) {
  const rowClassName = classNames(className, {
    [`data-table--selected`]: isSelected,
  });
  return <tr {...rest} className={rowClassName} />;
}

export default TableRow;
