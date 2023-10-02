import styles from "./ProgressBar.module.scss";
import { classNames } from "@/utils/classnames";

type Props = {
  severity: "warn" | "danger" | "info" | "success";
  value: number;
  label?: string;
};

function ProgressBar({ severity, value, label }: Props): JSX.Element {
  return (
    <div className={styles.progress_bar}>
      {label && (
        <div className={styles.info}>
          <label>{label}</label>
          <label className={styles.percentage}>{value}%</label>
        </div>
      )}
      <div className={styles.background_bar}></div>
      <div
        className={classNames(
          styles.tracker_bar,
          styles[`tracker_bar-${severity}`]
        )}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
