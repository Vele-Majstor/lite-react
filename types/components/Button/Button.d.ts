import { ButtonHTMLAttributes, ReactNode } from "react";
import { Numeric } from "@type-utils/number";
import "./Button.scss";
import { Size, Severity } from "./Button.types";
type Props = {
    severity?: Severity;
    size?: Size;
    children?: ReactNode;
} & ({
    icon: ReactNode | string;
    label: Numeric;
    iconTooltip?: never;
} | {
    icon: ReactNode | string;
    label?: never;
    iconTooltip: string;
} | {
    icon?: never;
    label: Numeric;
    iconTooltip?: never;
}) & ButtonHTMLAttributes<HTMLButtonElement>;
declare const Button: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLButtonElement>>;
export default Button;
