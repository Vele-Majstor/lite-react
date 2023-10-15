import { ComponentProps, ReactNode } from "react";
import Button from "@/components/Button/Button";
import "../ListBox/ListBox.scss";
import { LabelAction } from "./ContextMenu.types";
export type ContextMenuItemTemplate = React.ReactNode | ((option: LabelAction) => React.ReactNode);
type Props = {
    options: LabelAction[];
    label?: string;
    icon?: ReactNode;
    iconTooltip?: string;
    template?: ContextMenuItemTemplate;
} & ComponentProps<typeof Button>;
declare function ContextMenu({ options, label, icon, iconTooltip, template, ...other }: Props): JSX.Element;
export default ContextMenu;
