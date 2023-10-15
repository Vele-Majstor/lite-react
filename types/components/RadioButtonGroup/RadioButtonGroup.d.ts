import { ReactNode } from "react";
import "./RadioButtonGroup.scss";
export declare const RadioGroupContext: import("react").Context<{
    position: string;
}>;
type Props = {
    position?: "left" | "right";
    orientation?: "horizontal" | "vertical";
    legendText?: string;
    children: ReactNode;
};
declare function RadioButtonGroup({ children, orientation, legendText, position, }: Props): JSX.Element;
export default RadioButtonGroup;
