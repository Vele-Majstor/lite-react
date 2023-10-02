import AccordionContext from "@/context/AccordionContext";
import {
    ComponentClass,
    Dispatch,
    FunctionComponent,
    ReactNode,
    SetStateAction,
    useCallback,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";

type ReactElement = string | FunctionComponent<any> | ComponentClass<any>;

type Props<T> =
    | {
        element?: ReactElement;
        activeEventKey: T[] | null;
        multiple: true;
        onToggle: Dispatch<SetStateAction<T[] | null>>;
        children: ReactNode;
    }
    | {
        element?: ReactElement;
        activeEventKey: T | null;
        multiple?: false;
        onToggle: Dispatch<SetStateAction<T | null>>;
        children: ReactNode;
    }
    | {
        element?: ReactElement;
        children: ReactNode;
        multiple?: boolean;
        onToggle?: never;
        activeEventKey?: never;
    };

function Accordion<T extends string | number | null>({
    element: Component = "div",
    activeEventKey,
    onToggle,
    multiple = false,
    children,
    ...other
}: Props<T>): JSX.Element {
    const [eventKey, setEventKey] = useEventKey(activeEventKey, onToggle);

    const handleToggle = useCallback(
        (key: T) => {
            let filteredValue;
            if (multiple) {
                if ((eventKey as T[])?.includes(key)) {
                    filteredValue = (eventKey as T[]).filter((e) => e !== key);
                } else {
                    filteredValue = [...((eventKey as T[]) ?? []), key] as T[] & T;
                }
            } else {
                if (key !== eventKey) {
                    filteredValue = key;
                } else {
                    filteredValue = null;
                }
            }

            if (activeEventKey !== undefined && onToggle !== undefined) {
                onToggle(filteredValue as T & T[]);
                return;
            }
            setEventKey(filteredValue as T & T[]);
        },
        [activeEventKey, eventKey, multiple, onToggle, setEventKey]
    );

    const value = useMemo(() => {
        return {
            activeEventKey: eventKey,
            onToggle: handleToggle,
            multiple,
        };
    }, [eventKey, multiple, handleToggle]);

    return (
        <AccordionContext.Provider value={value as any}>
            <Component {...other}>{children}</Component>
        </AccordionContext.Provider>
    );
}

function useEventKey<T extends string | number | null>(
    eventKey?: T | T[] | null,
    onToggle?: Dispatch<SetStateAction<T | null>> | Dispatch<SetStateAction<T[] | null>>
) {
    const [activeEventKey, setActiveEventKey] = useState(eventKey);
    useLayoutEffect(() => {
        setActiveEventKey(eventKey);
    }, [eventKey, onToggle]);
    return [activeEventKey, setActiveEventKey] as [
        activeEventKey: T | T[] | undefined,
        setActiveEventKey:
        | Dispatch<SetStateAction<T | undefined>>
        | Dispatch<SetStateAction<T[] | undefined>>
    ];
}

export default Accordion;
