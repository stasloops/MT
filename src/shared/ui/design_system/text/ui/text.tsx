import clsx from "clsx";
import React, { FC } from "react";
import styles from "./text.module.scss";
import localFont from "next/font/local";

export const golos = localFont({
  src: "../../../fonts/Golos-Text_Medium.ttf",
  variable: "--golos",
});

export const supercell = localFont({
  src: "../../../fonts/KZSupercell-Magic.ttf",
  variable: "--supercell",
});

type As = keyof Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
>;

interface TextType {
  fontFamily: string;
  className: string;
  as: As;
  isShadow: boolean;
}

type TextVariants = "h1" | "h2" | "h3" | "description" | "numeration";

const TEXT_VARIANTS_CONFIG: Record<TextVariants, TextType> = {
  h1: {
    fontFamily: supercell.className,
    className: "h1",
    as: "h1",
    isShadow: true,
  },
  h2: {
    fontFamily: supercell.className,
    className: "h2",
    as: "h2",
    isShadow: true,
  },
  h3: {
    fontFamily: supercell.className,
    className: "h3",
    as: "h3",
    isShadow: true,
  },
  description: {
    fontFamily: golos.className,
    className: "description",
    as: "p",
    isShadow: false,
  },
  numeration: {
    fontFamily: supercell.className,
    className: "numeration",
    as: "p",
    isShadow: true,
  },
};

interface Props {
  children: React.ReactNode;
  variant: TextVariants;
  textAlign?: "left" | "center" | "right";
  className?: string;
}

export const Text: FC<Props> = ({
  children,
  variant,
  textAlign,
  className,
}) => {
  const currentTextVariant = TEXT_VARIANTS_CONFIG[variant];
  const Component = currentTextVariant.as;
  return (
    <Component
      className={clsx(
        className,
        styles.text,
        styles[`text--variant-${currentTextVariant.className}`],
        currentTextVariant.fontFamily,
        currentTextVariant.isShadow && styles.text_shadow
      )}
      style={{ textAlign }}
    >
      {children}
    </Component>
  );
};
