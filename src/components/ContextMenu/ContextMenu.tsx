import {
    ComponentProps,
    KeyboardEvent,
    ReactNode,
    useRef,
    useState,
} from "react";
import Button from "@/components/Button/Button";
import { useModalPosition } from "@/utils/modal";
import { CSSTransition } from "react-transition-group";
import "../ListBox/ListBox.scss";
import { LabelAction } from "./ContextMenu.types";
import ContextMenuItem from "./ContextMenuItem";
import { createPortal } from "react-dom";

export type ContextMenuItemTemplate =
    | React.ReactNode
    | ((option: LabelAction) => React.ReactNode);

type Props = {
    options: LabelAction[];
    label?: string;
    icon?: ReactNode;
    iconTooltip?: string;
    template?: ContextMenuItemTemplate;
} & ComponentProps<typeof Button>;

function ContextMenu({
    options,
    label,
    icon,
    iconTooltip,
    template,
    ...other
}: Props): JSX.Element {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    const { position } = useModalPosition(
        buttonRef as any,
        listRef,
        showMenu,
        closeMenu
    );

    function closeMenu() {
        setShowMenu(false);
    }

    function toggleMenu() {
        setShowMenu((prev) => !prev);
    }

    function listKeyUpDown(event: KeyboardEvent<HTMLUListElement>) {
        event.preventDefault();
        if (event.code !== "ArrowDown" && event.code !== "ArrowUp") {
            return;
        }

        const activeListElement = Array.from(
            (event.target as HTMLUListElement).children
        ).find((element) => element === document.activeElement);

        if (activeListElement) {
            if (event.code === "ArrowUp") {
                (activeListElement.nextElementSibling as HTMLElement)?.focus();
            }
            if (event.code === "ArrowDown") {
                (activeListElement.previousElementSibling as HTMLElement)?.focus();
            }

            return;
        }

        ((event.target as HTMLUListElement).children[0] as HTMLElement)?.focus();
    }

    return (
        <Button
            {...other}
            label={label as any}
            ref={buttonRef}
            icon={icon}
            iconTooltip={iconTooltip as any}
            onClick={toggleMenu}
        >
            {createPortal(
                <CSSTransition
                    nodeRef={listRef}
                    in={showMenu}
                    timeout={200}
                    classNames={"fade"}
                    unmountOnExit
                >
                    <ul
                        data-context-menu
                        className={"listbox"}
                        ref={listRef}
                        onKeyDown={listKeyUpDown}
                        style={{ ...position, width: "auto", minWidth: "10rem" }}
                    >
                        {options?.map((option) => (
                            <ContextMenuItem
                                key={option.label}
                                option={option}
                                template={template}
                            />
                        ))}
                    </ul>
                </CSSTransition>,
                document.body
            )}
        </Button>
    );
}

export default ContextMenu;
