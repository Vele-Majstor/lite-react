import {
    ReactNode,
    useState,
    useRef,
    Dispatch,
    SetStateAction,
    ComponentProps,
    ChangeEvent,
} from "react";
import { Size } from "./Table.types";
import Table from "./Table";
import TableHeaders from "./TableHeaders";
import { createRows, sortStates } from "./DataTable.functions";
import { defaultSortRow } from "@/utils/sorting";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import TableBody from "./TableBody";
import TableCell from "./TableCell";
import TableSelectAll from "./TableSelectAll";
import Checkbox from "./Checkbox";
import TableSelectRow from "./TableSelectRow";

type Header = { key: string; header: ReactNode; isSortable?: boolean };

type Props = {
    selectionMode?: boolean;
    selection?: (unknown | object | any)[] | null;
    setSelection?: Dispatch<SetStateAction<(unknown | object | any)[] | null>>;
    headers: Header[];
    rows: (unknown | object | any)[] & {
        _disabled?: boolean;
        _selected?: boolean;
    };
    overflowMenuOnHover?: boolean;
    size?: Size;
    stickyHeader?: boolean;
    staticWidth?: boolean;
    zebraStyles?: boolean;
    locale?: string;
};

function getNextSortDirection(
    header: Header,
    prevState: { sortDirection: string; header: Header | null }
) {
    if (prevState.header?.key === header.key) {
        if (prevState.sortDirection === "NONE") {
            return { sortDirection: sortStates.ASC, header: prevState.header };
        }
        if (prevState.sortDirection === "ASC") {
            return { sortDirection: sortStates.DESC, header: prevState.header };
        }
        return { sortDirection: sortStates.NONE, header: null };
    }
    return { sortDirection: sortStates.ASC, header };
}

function DataTable({
    selectionMode,
    selection,
    setSelection,
    headers,
    rows,
    overflowMenuOnHover,
    size = "lg",
    stickyHeader,
    staticWidth,
    zebraStyles,
    locale = "en",
}: Props) {
    const initialRows = useRef(rows).current;

    const [tableRows, setTableRows] = useState(createRows(rows));

    const [sort, setSort] = useState<{
        sortDirection: string;
        header: Header | null;
    }>({
        sortDirection: sortStates.NONE,
        header: null,
    });

    function sortByHeader(header: Header) {
        setSort((prev) => {
            const sortDirection = getNextSortDirection(header, prev).sortDirection;

            setTableRows((prevRows) => {
                if (sortDirection === sortStates.NONE) {
                    return initialRows;
                }

                const rows = JSON.parse(JSON.stringify(prevRows)).sort(
                    (a: any, b: any) =>
                        defaultSortRow(a[header.key], b[header.key], {
                            sortDirection,
                            sortStates,
                            locale,
                        })
                );
                return rows;
            });

            return getNextSortDirection(header, prev);
        });
    }

    function onSelectAll(event: {
        checked: boolean;
        event: ChangeEvent<HTMLInputElement>;
    }) {
        if (event.checked) {
            setSelection &&
                setSelection(tableRows.map((row) => ({ ...row, _selected: true })));
            return;
        }
        setSelection && setSelection(null);
    }

    function selectRow(row: any & { _selected?: boolean; _disabled: boolean }) {
        if (row._selected) {
            setSelection!(
                (prevSelection) =>
                    prevSelection?.filter((s) => s._id === row._id) as any
            );
            return;
        }
        setSelection!((prevSelection) => prevSelection?.concat(row) as any);
    }

    const selectAllProps = selectionMode
        ? {
            checked: tableRows.length > 0 && selection?.length === tableRows.length,
            indeterminate:
                tableRows.length > 0 &&
                selection?.length > 0 &&
                selection?.length !== tableRows.length,
            value: selection,
            onChange: onSelectAll,
            id: "select-all",
            name: "select-all",
        }
        : {};

    return (
        <Table
            zebraStyles={zebraStyles}
            overflowMenuOnHover={overflowMenuOnHover}
            size={size}
            stickyHeader={stickyHeader}
            staticWidth={staticWidth}
        >
            <TableHead>
                <TableRow>
                    {selectionMode && (
                        <TableSelectAll
                            {...(selectAllProps as ComponentProps<typeof Checkbox>)}
                        />
                    )}
                    {headers.map((header) => (
                        <TableHeaders
                            key={header.key}
                            header={header}
                            onClick={() => sortByHeader(header)}
                            sortDirection={sort.sortDirection}
                            isSortHeader={header.key === sort.header?.key}
                        >
                            {header.header}
                        </TableHeaders>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {tableRows.map((row, index) => (
                    <TableRow key={index}>
                        {selectionMode && (
                            <TableSelectRow
                                checked={
                                    selection?.find((sel) => sel._id === row._id) || row._selected
                                }
                                value={
                                    selection?.find((sel) => sel._id === row._id) || row._selected
                                }
                                onChange={() => {
                                    selectRow(row);
                                }}
                                disabled={row._disabled}
                                id={`${row._id} select`}
                            />
                        )}
                        {headers.map((header, index) => (
                            <TableCell key={index}>{row[header.key]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default DataTable;
