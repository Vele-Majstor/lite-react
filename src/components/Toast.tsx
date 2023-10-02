import { Toast as ToastType } from "./Toast.types";
import styles from "./Toast.module.scss";
import { classNames } from "@/utils/classnames";
import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import ProgressBar from "./ProgressBar";
import XIcon from "@/icons/XIcon";
import Bell from "@/icons/Bell";
import Check from "@/icons/Check";
import Info from "@/icons/Info";

type Props = PropsWithChildren<
  { id: string; onHide: (id: string) => void } & ToastType
>;

const TIMEOUT_TICK = 100;

const Toast = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      severity,
      style,
      sticky = false,
      summary,
      detail,
      life = 3000,
      onHide,
      closable = true,
      className,
      children,
    },
    ref
  ): JSX.Element => {
    let icon;
    switch (severity) {
      case "info":
        icon = <Info />;
        break;
      case "success":
        icon = <Check />;
        break;
      case "warn":
        icon = <Bell />;
        break;
      case "danger":
        icon = <XIcon />;
        break;
    }

    const timer = useRef<NodeJS.Timeout | null>(null);
    const timeRemaining = useRef(life);
    const [progressBarValue, setProgressBarValue] = useState(100);

    function onReset() {
      if (sticky) {
        return;
      }

      if (timer.current) {
        clearTimeout(timer.current);
      }
    }

    function onStart() {
      if (sticky) {
        return;
      }

      setProgressBarValue(Math.ceil((timeRemaining.current * 100) / life));
      if (timeRemaining.current! <= 0) {
        onHide(id);
      }

      timer.current = setTimeout(() => {
        timeRemaining.current! -= TIMEOUT_TICK;
        onStart();
      }, TIMEOUT_TICK);
    }

    useEffect(() => {
      onStart();

      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, []);

    return (
      <div
        className={classNames(styles[`toast-${severity}`], className)}
        style={style}
        ref={ref}
      >
        <div
          onMouseEnter={onReset}
          onMouseLeave={onStart}
          className={styles.toast}
        >
          <div className={styles.messageContent}>
            <span className={styles.toastIcon}>{icon}</span>
            <div className={styles.messageText}>
              {summary && (
                <span className={styles.toastSummary}>{summary}</span>
              )}
              {detail && <span className={styles.toastDetail}>{detail}</span>}
            </div>
            {children}
          </div>
          {closable && (
            <button
              type="button"
              onClick={() => {
                onHide(id);
              }}
              className={classNames(
                styles.toastCloseButton,
                styles[`toastCloseButton-${severity}`]
              )}
            >
              <XIcon />
            </button>
          )}
        </div>
        {!sticky && (
          <ProgressBar
            severity={severity}
            value={progressBarValue}
          ></ProgressBar>
        )}
      </div>
    );
  }
);

export default Toast;
