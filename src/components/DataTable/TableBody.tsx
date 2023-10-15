import { HTMLAttributes } from "react";
import "./DataTable.scss";

function TableBody({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>): JSX.Element {
  return (
    <tbody className={className} aria-live="polite" {...rest}>
      {children}
    </tbody>
  );
}

export default TableBody;
