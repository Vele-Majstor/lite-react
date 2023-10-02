import { classNames } from "@/utils/classnames";
import {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
} from "react";

import styles from "./Modal.module.scss";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { elementOrParentIsFloatingMenu } from "./Modal.functions";
import Button from "./Button";
import XIcon from "@/icons/XIcon";

type Props = {
  visible: boolean;
  onHide: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  header?: ReactNode;
  footer?: ReactNode;
  preventCloseOnClickOutside?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function Modal({
  onHide,
  visible,
  size = "md",
  header,
  footer,
  children,
  preventCloseOnClickOutside = false,
  className,
  ...other
}: Props): JSX.Element {
  const outerModal = useRef<HTMLDivElement>(null);
  const innerModal = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (visible) {
      if (event.code === "Escape") {
        onHide();
      }
    }
  }

  useEffect(() => {
    if (visible) {
      document.getElementById("root")?.setAttribute("inert", "");
      outerModal.current?.focus();
    }
    return () => {
      document.getElementById("root")?.removeAttribute("inert");
    };
  }, [visible]);

  function handleMousedown(event: MouseEvent<HTMLDivElement>) {
    if (
      innerModal.current &&
      !innerModal.current.contains(event.target as HTMLElement) &&
      !elementOrParentIsFloatingMenu(event.target as HTMLElement) &&
      !preventCloseOnClickOutside
    ) {
      onHide();
    }
  }
  const modalPortalContainer =
    document.getElementById("modal-portal-container") || document.body;

  return (
    <>
      {createPortal(
        <CSSTransition
          in={visible}
          unmountOnExit
          mountOnEnter
          timeout={200}
          classNames={"fade-up"}
          nodeRef={outerModal}
          tabIndex={0}
        >
          <div
            onKeyDown={handleKeyDown}
            onMouseDown={handleMousedown}
            className={classNames(styles.modal, className)}
            role="presentation"
            ref={outerModal}
            {...other}
          >
            <div
              className={classNames(styles.modal_container, {
                [styles[`modal_container--${size}`]]: size,
              })}
              ref={innerModal}
              role="dialog"
              aria-modal="true"
            >
              <div className={styles.modal_header}>
                {header && (
                  <h3 className={styles["modal_header--heading"]}>{header}</h3>
                )}
                <Button
                  className={styles.modal_close}
                  icon={<XIcon />}
                  iconTooltip="Close"
                  severity="ghost"
                  onClick={onHide}
                />
              </div>
              <div className={styles.modal_content}>{children}</div>
              {footer && <div className={styles.modal_footer}>{footer}</div>}
            </div>
          </div>
        </CSSTransition>,
        modalPortalContainer
      )}
    </>
  );
}

export default Modal;
