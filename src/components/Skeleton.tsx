import { classNames } from "@/utils/classnames";
import { CSSProperties } from "react";

import styles from "./Skeleton.module.scss";

type NumberOrStringKeys = {
  [key in "size" | "width" | "height" | "borderRadius"]?: string | number;
};

type Props = {
  shape?: "rectangle" | "circle";
  style?: CSSProperties;
  className?: string;
} & NumberOrStringKeys;

function Skeleton({
  size,
  borderRadius,
  width,
  height,
  shape,
  style: additionalStyle,
  className,
}: Props): JSX.Element {
  const style = size
    ? {
        width: size,
        height: size,
        borderRadius: borderRadius,
      }
    : {
        width: width,
        height: height,
        borderRadius: borderRadius,
      };

  return (
    <div
      style={{ ...style, ...additionalStyle }}
      className={classNames(
        styles.skeleton,
        { [styles.skeleton_circle]: shape === "circle" },
        className
      )}
    />
  );
}

export default Skeleton;
