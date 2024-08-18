"use client";

import React, { ButtonHTMLAttributes, FC, useState } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className: string;
}
export const Button: FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button className={clsx(styles.wrapper, className)} {...rest}>
      <div>
        <div className={styles.button}>{children}</div>
      </div>
    </button>
  );
};
