import { TableContext } from "@/hooks/useTableContext";
import { classNames } from "@/utils/classnames";
import { HTMLAttributes, useMemo } from "react";

type Props = {
  description?: React.ReactNode;
  stickyHeader?: boolean;
  useStaticWidth?: boolean;
  title?: React.ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "title">;

function TableContainer({
  description,
  title,
  className,
  useStaticWidth,
  stickyHeader,
  children,
  ...other
}: Props): JSX.Element {
  const baseId = window.crypto.randomUUID();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const tableContainerClasses = classNames(className, `data-table-container`, {
    [`data-table--max-width`]: stickyHeader,
    [`data-table-container--static`]: useStaticWidth,
  });

  const value = useMemo(() => {
    return {
      titleId: title ? titleId : undefined,
      descriptionId: description ? descriptionId : undefined,
    };
  }, [title, description, titleId, descriptionId]);

  return (
    <TableContext.Provider value={value}>
      <div {...other} className={tableContainerClasses}>
        {title && (
          <div className={`data-table-header`}>
            <h4 className={`data-table-header__title`} id={titleId}>
              {title}
            </h4>
            <p className={`data-table-header__description`} id={descriptionId}>
              {description}
            </p>
          </div>
        )}
        {children}
      </div>
    </TableContext.Provider>
  );
}

export default TableContainer;
