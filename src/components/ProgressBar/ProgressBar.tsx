import "./ProgressBar.scss";
import { classNames } from "@/utils/classnames";

type Props = {
  severity: "warn" | "danger" | "info" | "success";
  value: number;
  label?: string;
};

function ProgressBar({ severity, value, label }: Props): JSX.Element {
  return (
    <div className={"progress_bar"}>
      {label && (
        <div className={"progress_bar__info"}>
          <label>{label}</label>
          <label className={"progress_bar__percentage"}>{value}%</label>
        </div>
      )}
      <div className={"background_bar"}></div>
      <div
        className={classNames("tracker_bar", `tracker_bar-${severity}`)}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
