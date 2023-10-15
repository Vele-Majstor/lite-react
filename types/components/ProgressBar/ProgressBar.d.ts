import "./ProgressBar.scss";
type Props = {
    severity: "warn" | "danger" | "info" | "success";
    value: number;
    label?: string;
};
declare function ProgressBar({ severity, value, label }: Props): JSX.Element;
export default ProgressBar;
