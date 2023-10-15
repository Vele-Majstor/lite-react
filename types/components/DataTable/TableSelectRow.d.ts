import { ComponentProps } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./DataTable.scss";
type Props = ComponentProps<typeof Checkbox>;
declare function TableSelectRow({ indeterminate, checked, id, name, onChange, disabled, className, ...rest }: Props): JSX.Element;
export default TableSelectRow;
