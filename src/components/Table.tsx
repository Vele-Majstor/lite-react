import {
    HTMLAttributes,
    useCallback,
    useContext,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { Size } from "./Table.types";
import { classNames } from "@/utils/classnames";
import { debounce } from "@/utils/debounce";
import { getResizeObserver } from "@/utils/resize";
import { TableContext } from "@/hooks/useTableContext";
import "./DataTable.scss"

type Props = {
    className?: string;
    isSortable?: boolean;
    overflowMenuOnHover?: boolean;
    size?: Size;
    stickyHeader?: boolean;
    staticWidth?: boolean;
    zebraStyles?: boolean;
} & HTMLAttributes<HTMLTableElement>;

function Table({
    className,
    children,
    zebraStyles,
    size = "lg",
    isSortable = false,
    staticWidth,
    stickyHeader,
    overflowMenuOnHover = true,
    ...other
}: Props): JSX.Element {
    const { titleId, descriptionId } = useContext(TableContext);
    const [isScrollable, setIsScrollable] = useState(false);
    const tableRef = useRef<HTMLTableElement>(null);
    const tableClassName = classNames(`data-table`, className, {
        [`data-table--${size}`]: size,
        [`data-table--sort`]: isSortable,
        [`data-table--zebra`]: zebraStyles,
        [`data-table--static`]: staticWidth,
        [`data-table--sticky-header`]: stickyHeader,
        [`data-table--visible-overflow-menu`]: !overflowMenuOnHover,
    });

    const setTabIndex = useCallback(() => {
        const tableContainer = tableRef?.current?.parentNode as HTMLElement;
        const tableHeader = tableRef?.current?.firstChild as HTMLElement;

        if (tableHeader?.scrollWidth > tableContainer?.clientWidth) {
            setIsScrollable(true);
        } else {
            setIsScrollable(false);
        }
    }, []);

    const debouncedSetTabIndex = debounce(setTabIndex, 100);
    const { resizeObserver, observe } = getResizeObserver(debouncedSetTabIndex);

    useLayoutEffect(() => {
        if (tableRef.current) {
            observe!(tableRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useLayoutEffect(() => {
        setTabIndex();
    }, [setTabIndex]);

    const table = (
        <div
            className={`data-table-content`}
            tabIndex={isScrollable ? 0 : undefined}
        >
            <table
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                {...other}
                className={tableClassName}
                ref={tableRef}
            >
                {children}
            </table>
        </div>
    );

    return stickyHeader ? (
        <section className={`data-table_inner-container`}>{table}</section>
    ) : (
        table
    );
}

export default Table;
