"use client";

import React, { ButtonHTMLAttributes, FC } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

type VariantType = 'primary' | 'default' | 'save';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
  variant?: VariantType
}
export const Button: FC<ButtonProps> = ({
  children,
  className,
  isDisabled,
  variant = 'default',
  ...rest
}) => {
  return (
    <button
      disabled={isDisabled}
      className={clsx(styles.wrapper, styles[`wrapper--variant-${variant}`], className)}
      {...rest}
    >
      <div>
        <div className={clsx(isDisabled && styles.disabled, styles.button, styles[`button--variant-${variant}`],)}>
          <span className={clsx(isDisabled && styles.disabled_text)}>
            {children}
          </span>
        </div>
      </div>
    </button>
  );
};
