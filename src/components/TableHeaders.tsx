import ArrowUp from "@/icons/ArrowUp";
import ArrowsVertical from "@/icons/ArrowsVertical";
import { classNames } from "@/utils/classnames";
import { HTMLAttributes } from "react";
import { ReactNode } from "react";
import { sortStates } from "./DataTable.functions";
import "./DataTable.scss";

type Props = {
  header: { key: string; header: ReactNode; isSortable?: boolean };
  colSpan?: number;
  scope?: string;
  sortDirection?: string;
  isSortHeader: boolean;
} & HTMLAttributes<HTMLTableCellElement>;

function TableHeaders({
  onClick,
  scope,
  colSpan,
  header,
  sortDirection,
  isSortHeader,
  id,
  className,
  children,
  ...other
}: Props): JSX.Element {
  if (!header.isSortable) {
    return (
      <th
        {...other}
        id={id}
        className={className}
        colSpan={colSpan}
        scope={scope}
      >
        {children ? (
          <div className={`table-header-label`}>{children}</div>
        ) : null}
      </th>
    );
  }

  const headerClassName = classNames(className, {
    [`table-sort__header`]: true,
    [`table-sort--active`]: isSortHeader && sortDirection !== sortStates.NONE,
    [`table-sort--descending`]:
      isSortHeader && sortDirection === sortStates.DESC,
  });

  return (
    <th
      id={id}
      aria-sort={sortDirection}
      className={headerClassName}
      colSpan={colSpan}
      scope={scope}
      {...(other as any)}
    >
      <button type="button" className="table-sort" onClick={onClick as any}>
        <span className={`table-sort__flex`}>
          <div className={`table-header-label`}>{children}</div>
          <ArrowUp className={`table-sort__icon`} />
          <ArrowsVertical className={`table-sort__icon-unsorted`} />
        </span>
      </button>
    </th>
  );
}

export default TableHeaders;
