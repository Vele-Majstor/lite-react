import { CSSProperties } from "react";

type Severity = "info" | "success" | "warn" | "danger";

export type ToastFunctions = {
  show: (val: Toast | Toast[]) => void;
  clear: () => void;
};
export type Position = "top-right" | "bottom-right" | "top-left" | "top-right";
export type Toast = {
  severity: Severity;
  summary: string;
  detail?: string;
  className?: string;
  style?: CSSProperties;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
};
