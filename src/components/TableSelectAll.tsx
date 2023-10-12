import { ComponentProps } from "react";
import Checkbox from "./Checkbox";
import { classNames } from "@/utils/classnames";
import "./DataTable.scss";

type Props = ComponentProps<typeof Checkbox>;

function TableSelectAll({
  checked,
  id,
  indeterminate,
  name,
  onChange,
  disabled,
  className,
  ...rest
}: Props) {
  return (
    <th scope="col" className={classNames("table-column-checkbox", className)}>
      <Checkbox
        checked={checked}
        id={id}
        indeterminate={indeterminate}
        name={name}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
    </th>
  );
}

export default TableSelectAll;
