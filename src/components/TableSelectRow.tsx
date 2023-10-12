import { ComponentProps } from "react";
import Checkbox from "./Checkbox";
import { classNames } from "@/utils/classnames";

type Props = ComponentProps<typeof Checkbox>;

function TableSelectRow({
  indeterminate,
  checked,
  id,
  name,
  onChange,
  disabled,
  className,
  ...rest
}: Props): JSX.Element {
  const tableSelectRowClasses = classNames(className, "table-column-checkbox");
  return (
    <td className={tableSelectRowClasses}>
      <Checkbox
        checked={checked}
        id={id}
        indeterminate={indeterminate}
        name={name}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
    </td>
  );
}

export default TableSelectRow;
