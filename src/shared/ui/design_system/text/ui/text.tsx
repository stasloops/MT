import clsx from "clsx";
import React, { FC } from "react";
import styles from "./text.module.scss";

type Size = "title" | "title-2" | "text" | "text-2" | "text-3";

type As = keyof Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
>;

type FontWight = 400 | 700;

interface Props {
  children: React.ReactNode;
  size: Size;
  as: As;
  textAlign?: "left" | "center" | "right";
  fontWeight?: FontWight;
  className?: string;
}

export const Text: FC<Props> = ({
  children,
  as: Component,
  size,
  textAlign,
  fontWeight,
  className,
}) => {
  return (
    <div className={styles.wrapper}>
      <Component
        className={clsx(className, styles.text, styles[`text--size_${size}`])}
        style={{ fontWeight, textAlign }}
      >
        {children}
      </Component>
    </div>
  );
};
