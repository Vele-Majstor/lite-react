/// <reference types="react" />
import { Toast as ToastType } from "./Toast.types";
import "./Toast.scss";
declare const Toast: import("react").ForwardRefExoticComponent<{
    id: string;
    onHide: (id: string) => void;
} & ToastType & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<HTMLDivElement>>;
export default Toast;
