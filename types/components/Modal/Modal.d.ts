import { HTMLAttributes, ReactNode } from "react";
import "./Modal.scss";
type Props = {
    visible: boolean;
    onHide: () => void;
    size?: "xs" | "sm" | "md" | "lg";
    header?: ReactNode;
    footer?: ReactNode;
    preventCloseOnClickOutside?: boolean;
} & HTMLAttributes<HTMLDivElement>;
declare function Modal({ onHide, visible, size, header, footer, children, preventCloseOnClickOutside, className, ...other }: Props): JSX.Element;
export default Modal;
