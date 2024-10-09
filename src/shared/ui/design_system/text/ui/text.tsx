import clsx from "clsx";
import React, { FC } from "react";
import styles from "./text.module.scss";
import localFont from "next/font/local";
import { Inter } from 'next/font/google'


const inter = Inter({
  variable: '--inter',
  subsets: ['cyrillic', 'latin']

})

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

type TextVariants =
  | "title_l"
  | "title_m"
  | "title_s"
  | "caption_l"
  | "caption_m"
  | "body"
  | "description"

const TEXT_VARIANTS_CONFIG: Record<TextVariants, TextType> = {
  title_l: {
    fontFamily: supercell.className,
    className: "title_l",
    as: "h1",
    isShadow: true,
  },
  title_m: {
    fontFamily: supercell.className,
    className: "title_m",
    as: "h2",
    isShadow: true,
  },
  title_s: {
    fontFamily: supercell.className,
    className: "title_s",
    as: "h3",
    isShadow: true,
  },
  caption_l: {
    fontFamily: supercell.className,
    className: "caption_l",
    as: "span",
    isShadow: true,
  },
  caption_m: {
    fontFamily: golos.className,
    className: "caption_m",
    as: "span",
    isShadow: false,
  },
  body: {
    fontFamily: inter.className,
    className: "body",
    as: "p",
    isShadow: false,
  },
  description: {
    fontFamily: supercell.className,
    className: "description",
    as: "span",
    isShadow: true,
  }
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
  const Component = currentTextVariant?.as || 'p'
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
