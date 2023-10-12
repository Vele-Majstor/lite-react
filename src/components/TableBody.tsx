import { HTMLAttributes } from "react";

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
