import { Dispatch, SetStateAction, createContext } from "react";

export default createContext<{
  activeEventKey: string | number | null | (string | number | null)[];
  onToggle:
    | Dispatch<SetStateAction<string | number | null>>
    | Dispatch<SetStateAction<(string | number | null)[]>>;
  multiple: boolean;
}>({ activeEventKey: 0, onToggle: () => {}, multiple: false });
