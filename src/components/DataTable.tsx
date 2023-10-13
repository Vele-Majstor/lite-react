import {
  ReactNode,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useEffect,
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
  const initialRowsOrder = useRef(createRows(rows));

  const [tableRows, setTableRows] = useState(initialRowsOrder.current);

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
          return initialRowsOrder.current;
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
      initialRowsOrder.current = tableRows.map((row) => ({
        ...row,
        _selected: true,
      }));
      setTableRows((prev) =>
        prev.map((row) => ({
          ...row,
          _selected: true,
        }))
      );
      return;
    }
    initialRowsOrder.current = tableRows.map((row) => ({
      ...row,
      _selected: false,
    }));
    setTableRows((prev) =>
      prev.map((row) => ({
        ...row,
        _selected: false,
      }))
    );
  }

  function setSelectedRows(_row: any, row: any, value: boolean) {
    return _row._id !== row._id ? { ..._row } : { ..._row, _selected: value };
  }

  function selectRow(row: any & { _selected?: boolean; _disabled: boolean }) {
    if (row._selected) {
      initialRowsOrder.current = initialRowsOrder.current.map((_row) =>
        setSelectedRows(_row, row, false)
      );
      setTableRows((prev) =>
        prev.map((_row) => setSelectedRows(_row, row, false))
      );
      return;
    }
    initialRowsOrder.current = initialRowsOrder.current.map((_row) =>
      setSelectedRows(_row, row, true)
    );
    setTableRows((prev) =>
      prev.map((_row) => setSelectedRows(_row, row, true))
    );
  }

  useEffect(() => {
    const selectionArr: any[] = [];
    tableRows.forEach((row) => {
      if (row._selected) selectionArr.push(row);
    });
    setSelection && setSelection(selectionArr.length > 0 ? selectionArr : null);
  }, [tableRows, setSelection]);

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
              checked={
                tableRows.length > 0 && selection?.length === tableRows.length
              }
              indeterminate={
                !!tableRows.length &&
                !!selection?.length &&
                selection?.length !== tableRows.length
              }
              value={String(
                tableRows.length > 0 && selection?.length === tableRows.length
              )}
              onChange={onSelectAll}
              id="select-all"
              name="select-all"
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
        {tableRows.map((row) => (
          <TableRow key={row._id}>
            {selectionMode && (
              <TableSelectRow
                checked={row._selected}
                value={String(row._selected)}
                onChange={() => {
                  selectRow(row);
                }}
                disabled={row._disabled}
                id={`${row._id} select`}
              />
            )}
            {headers.map((header) => (
              <TableCell key={header.key}>{row[header.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;
