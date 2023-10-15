import { HTMLAttributes } from "react";
import "./Toast.scss";
import { Position, ToastFunctions } from "./Toast.types";
declare const ToastContainer: import("react").ForwardRefExoticComponent<{
    position: Position;
} & HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement & ToastFunctions>>;
export default ToastContainer;
