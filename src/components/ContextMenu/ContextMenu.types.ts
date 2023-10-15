export type ContextMenuItemTemplate =
  | React.ReactNode
  | ((option: {
      label: string;
      action: (...args: any) => any;
    }) => React.ReactNode);

export type LabelAction = { label: string; action: (...args: any) => any };
