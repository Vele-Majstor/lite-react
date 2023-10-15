import { HTMLAttributes } from "react";

function TableHead({
  ...props
}: HTMLAttributes<HTMLTableSectionElement>): JSX.Element {
  return <thead {...props}></thead>;
}

export default TableHead;
