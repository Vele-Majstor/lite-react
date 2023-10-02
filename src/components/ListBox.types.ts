import { LabelValue } from "@/type-utils/listbox";
import { KeyboardEvent, MouseEvent } from "react";

export type ListBoxItemTemplate<T> =
  | React.ReactNode
  | ((option: LabelValue<T>) => React.ReactNode);

export type MultipleSelectProps<T> = {
  multiple: true;
  value: T[] | null;
  onChange: (value: {
    value: T[] | null;
    event:
      | MouseEvent<HTMLLIElement | HTMLButtonElement>
      | KeyboardEvent<HTMLLIElement>;
  }) => void;
};

export type SingleSelectProps<T> = {
  onChange: (value: {
    value: T | null;
    event:
      | MouseEvent<HTMLLIElement | HTMLButtonElement>
      | KeyboardEvent<HTMLLIElement>;
  }) => void;
  multiple?: false;
  value: T | null;
};
