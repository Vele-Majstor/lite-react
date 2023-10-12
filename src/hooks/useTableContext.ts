import { createContext } from "react";

type TableContextType = {
  titleId?: string;
  descriptionId?: string;
};

export const TableContext = createContext<TableContextType>({
  titleId: undefined,
  descriptionId: undefined,
});
