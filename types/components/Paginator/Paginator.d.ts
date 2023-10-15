import { MouseEvent } from "react";
import "./Paginator.scss";
type Props = {
    first: number;
    rows: number;
    totalRecords: number;
    rowsPerPageOptions: number[];
    onPageChange: (event: {
        originalEvent: MouseEvent<HTMLButtonElement>;
        first: number;
        rows: number;
        page: number;
        pageCount: number;
    }) => void;
    pageLinkSize?: number;
};
declare function Paginator({ first, rows, totalRecords, rowsPerPageOptions, pageLinkSize, onPageChange, }: Props): JSX.Element;
export default Paginator;
