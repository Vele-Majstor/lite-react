import { classNames } from "@/utils/classnames";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

import { Numeric } from "@type-utils/number";
import "./Button.scss";
import { Size, Severity } from "./Button.types";
import Tooltip from "@/components/Tooltip/Tooltip";

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

const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            type = "button",
            severity = "primary",
            size = "normal",
            label,
            icon,
            iconTooltip,
            className: _className,
            children,
            ...other
        },
        ref
    ): JSX.Element => {
        const iconOnly = !!icon && label === undefined;

        const className = classNames(
            _className,
            "button",
            `button-${severity}`,
            `button-${size}`,
            {
                "button__icon-only": iconOnly,
            }
        );

        return (
            <button ref={ref} type={type} className={className} {...other}>
                {label && <span>{label}</span>}
                {icon && (
                    <span className={classNames("button__icon")}>
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
);

export default Button;
