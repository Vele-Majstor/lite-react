import { classNames } from "@/utils/classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { Numeric } from "@type-utils/number";
import styles from "./Button.module.scss";
import { Size, Severity } from "./Button.types";
import Tooltip from "./Tooltip";

type Props = {
  severity?: Severity;
  size?: Size;
  children?: ReactNode;
} & (
  | { icon: ReactNode | string; label: Numeric; iconTooltip?: never }
  | { icon: ReactNode | string; label?: never; iconTooltip: string }
  | { icon?: never; label: Numeric; iconTooltip?: never }
) &
  ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  type = "button",
  severity = "primary",
  size = "normal",
  label,
  icon,
  iconTooltip,
  className: _className,
  children,
  ...other
}: Props): JSX.Element {
  const iconOnly = !!icon && label === undefined;

  const className = classNames(
    _className,
    styles.button,
    styles[`button-${severity}`],
    styles[`button-${size}`],
    {
      [styles["button__icon-only"]]: iconOnly,
    }
  );

  return (
    <button type={type} className={className} {...other}>
      {label && <span className={styles.label}>{label}</span>}
      {icon && (
        <span className={classNames(styles.button__icon)}>
          {iconOnly ? (
            <Tooltip text={iconTooltip} position="bottom">
              {icon}
            </Tooltip>
          ) : (
            icon
          )}
        </span>
      )}
      {children}
    </button>
  );
}

export default Button;
