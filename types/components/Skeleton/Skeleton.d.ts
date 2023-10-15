import { CSSProperties } from "react";
import "./Skeleton.scss";
type NumberOrStringKeys = {
    [key in "size" | "width" | "height" | "borderRadius"]?: string | number;
};
type Props = {
    shape?: "rectangle" | "circle";
    style?: CSSProperties;
    className?: string;
} & NumberOrStringKeys;
declare function Skeleton({ size, borderRadius, width, height, shape, style: additionalStyle, className, }: Props): JSX.Element;
export default Skeleton;
