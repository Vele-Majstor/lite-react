import { MouseEvent, useEffect, useRef } from "react";
import Button from "../Button/Button";
import ChevronDoubleLeft from "@/icons/ChevronDoubleLeft";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import Dropdown from "../Dropdown/Dropdown";
import ChevronDoubleRight from "@/icons/ChevronDoubleRight";
import "./Paginator.scss";
import { classNames } from "@/utils/classnames";

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

function Paginator({
  first,
  rows,
  totalRecords,
  rowsPerPageOptions,
  pageLinkSize = 5,
  onPageChange,
}: Props): JSX.Element {
  const elementRef = useRef(null);
  const page = Math.floor(first / rows);
  const pageCount = Math.ceil(totalRecords / rows);

  function changePage(
    event: MouseEvent<HTMLButtonElement>,
    first: number,
    rows: number
  ) {
    const pc = pageCount;
    const p = Math.floor(first / rows);

    if (p >= 0 && p < pc) {
      const newPageState = {
        first,
        rows,
        page: p,
        pageCount: pc,
        originalEvent: event,
      };

      onPageChange(newPageState);
    }
  }

  const calculatePageLinkBoundaries = () => {
    const numberOfPages = pageCount;
    const visiblePages = Math.min(pageLinkSize, numberOfPages);

    let start = Math.max(0, Math.ceil(page - visiblePages / 2));
    const end = Math.min(numberOfPages - 1, start + visiblePages - 1);

    const delta = pageLinkSize - (end - start + 1);

    start = Math.max(0, start - delta);

    return [start, end];
  };

  const updatePageLinks = () => {
    const pageLinks = [];
    const boundaries = calculatePageLinkBoundaries();
    const start = boundaries[0];
    const end = boundaries[1];

    for (let i = start; i <= end; i++) {
      pageLinks.push(i + 1);
    }

    return pageLinks;
  };

  function changePageToFirst(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    changePage(event, 0, rows);
  }

  function changePageToPrev(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    changePage(event, first - rows, rows);
  }

  function onPageLinkClick(
    value: number,
    event: MouseEvent<HTMLButtonElement>
  ) {
    changePage(event, (value - 1) * rows, rows);
  }

  function changePageToNext(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    changePage(event, first + rows, rows);
  }

  function changePageToLast(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    changePage(event, (pageCount - 1) * rows, rows);
  }

  function onRowsChange(event: {
    originalEvent: MouseEvent<HTMLButtonElement>;
    value: number | null;
  }) {
    const changedRows = event.value ?? rows;

    changePage(event.originalEvent, 0, changedRows);
  }

  useEffect(() => {
    if (page > 0 && first >= totalRecords) {
      changePage(null as any, (pageCount - 1) * rows, rows);
    }
  }, [totalRecords]);

  const rowPageOptions = rowsPerPageOptions.map((row) => ({
    label: String(row),
    value: row,
  }));

  const elements = updatePageLinks();

  return (
    <div className="wrapper">
      <div className="paginator" ref={elementRef}>
        <Button
          className="paginator-first"
          severity="ghost"
          icon={<ChevronDoubleLeft />}
          iconTooltip="Go to first"
          onClick={changePageToFirst}
        />
        <Button
          className="paginator-prev"
          severity="ghost"
          icon={<ChevronLeft />}
          iconTooltip="Go to previous page"
          onClick={changePageToPrev}
        />

        <span className="pages">
          {elements.map((element) => (
            <button
              key={element}
              onClick={(event) => {
                onPageLinkClick(element, event);
              }}
              className={classNames("paginator-page", {
                "paginator-page--selected": page === element - 1,
              })}
              type="button"
            >
              {element}
            </button>
          ))}
        </span>

        <Button
          className="paginator-next"
          severity="ghost"
          icon={<ChevronRight />}
          iconTooltip="Go to next page"
          onClick={changePageToNext}
        />
        <Button
          className="paginator-last"
          severity="ghost"
          icon={<ChevronDoubleRight />}
          iconTooltip="Go to last page"
          onClick={changePageToLast}
        />
        <Dropdown
          className="paginator-dropdown"
          value={rows}
          onChange={onRowsChange as any}
          options={rowPageOptions}
        />
      </div>
      <span className="paginator-info">
        {first} - {first + rows} of {totalRecords}
      </span>
    </div>
  );
}

export default Paginator;
