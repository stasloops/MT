

import clsx from "clsx";
import React, { FC } from "react";
import styles from "./text.module.scss";
import localFont from 'next/font/local'

export const golos = localFont({
  src: "../../../fonts/Golos-Text_Medium.ttf",
  variable: "--golos",
});

export const supercell = localFont({
  src: "../../../fonts/KZSupercell-Magic.ttf",
  variable: "--supercell",
});

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
  font?: "golos" | "supercell";
  textAlign?: "left" | "center" | "right";
  fontWeight?: FontWight;
  className?: string;
}

export const Text: FC<Props> = ({
  children,
  as: Component,
  font = 'supercell',
  size,
  textAlign,
  fontWeight,
  className,
}) => {
  const fonts = {
    golos: golos.className,
    supercell: supercell.className,
  };

  return (
    <div className={styles.wrapper}>
      <Component
        className={clsx(
          className,
          styles.text,
          styles[`text--size_${size}`],
          fonts[font]
        )}
        style={{ fontWeight, textAlign }}
      >
        {children}
      </Component>
    </div>
  );
};
