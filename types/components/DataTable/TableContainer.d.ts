import { HTMLAttributes } from "react";
type Props = {
    description?: React.ReactNode;
    stickyHeader?: boolean;
    useStaticWidth?: boolean;
    title?: React.ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "title">;
declare function TableContainer({ description, title, className, useStaticWidth, stickyHeader, children, ...other }: Props): JSX.Element;
export default TableContainer;
