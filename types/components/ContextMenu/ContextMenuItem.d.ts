import "../ListBox/ListBox.scss";
import { ContextMenuItemTemplate, LabelAction } from "./ContextMenu.types";
type Props = {
    option: LabelAction;
    template: ContextMenuItemTemplate;
};
declare function ContextMenuItem({ option, template }: Props): JSX.Element;
export default ContextMenuItem;
