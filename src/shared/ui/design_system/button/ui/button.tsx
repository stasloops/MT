"use client";

import React, { ButtonHTMLAttributes, FC } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
}
export const Button: FC<ButtonProps> = ({
  children,
  className,
  isDisabled,
  ...rest
}) => {
  return (
    <button
      disabled={isDisabled}
      className={clsx(styles.wrapper, className)}
      {...rest}
    >
      <div>
        <div className={clsx(isDisabled && styles.disabled, styles.button)}>
          <span className={clsx(isDisabled && styles.disabled_text)}>
            {children}
          </span>
        </div>
      </div>
    </button>
  );
};
