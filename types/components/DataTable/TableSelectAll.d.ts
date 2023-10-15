import { ComponentProps } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./DataTable.scss";
type Props = ComponentProps<typeof Checkbox>;
declare function TableSelectAll({ checked, id, indeterminate, name, onChange, disabled, className, ...rest }: Props): import("react/jsx-runtime").JSX.Element;
export default TableSelectAll;
