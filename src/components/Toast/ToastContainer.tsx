import {
  HTMLAttributes,
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import "./Toast.scss";
import { classNames } from "@/utils/classnames";
import { Toast, Position, ToastFunctions } from "./Toast.types";
import ToastItem from "./Toast.tsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type Props = { position: Position } & HTMLAttributes<HTMLDivElement>;

const ToastContainer = forwardRef<HTMLDivElement & ToastFunctions, Props>(
  ({ position, className, ...other }, ref): JSX.Element => {
    const [toasts, setToasts] = useState<Map<string, Toast>>(new Map());

    useImperativeHandle(ref, () => {
      return {
        show: (val: Toast | Toast[]) => {
          if (Array.isArray(val)) {
            setToasts((prev) => {
              const map = new Map(prev);
              val.forEach((v) => {
                const id = window.crypto.randomUUID();
                map.set(id, v);
              });
              return map;
            });
            return;
          }
          setToasts((prev) => {
            const id = window.crypto.randomUUID();
            const map = new Map(prev);
            map.set(id, val);
            return map;
          });
        },
        clear: () => {
          setToasts(new Map());
        },
      } as ToastFunctions & HTMLDivElement;
    });

    function filterToasts(id: string) {
      setToasts((prev) => {
        const map = new Map(prev);
        map.delete(id);
        return map;
      });
    }

    function mapToasts() {
      const content = [];
      for (const [key, value] of toasts) {
        const ref = createRef<HTMLDivElement>();
        content.push(
          <CSSTransition
            nodeRef={ref}
            key={key}
            classNames={
              position === "top-right" || position === "bottom-right"
                ? "fade-right"
                : "fade-left"
            }
            timeout={200}
          >
            <ToastItem
              ref={ref}
              key={key}
              id={key}
              onHide={filterToasts}
              severity={value.severity}
              summary={value.summary}
              detail={value.detail}
              life={value.life}
              closable={value.closable}
              sticky={value.sticky}
              className={value.className}
              style={value.style}
            />
          </CSSTransition>
        );
      }
      return content;
    }

    return (
      <div
        className={classNames("toast-container", className, {
          [`toast-container-${position}`]: position,
        })}
        ref={ref}
        {...other}
      >
        <TransitionGroup enter exit>
          {mapToasts()}
        </TransitionGroup>
      </div>
    );
  }
);

export default ToastContainer;
