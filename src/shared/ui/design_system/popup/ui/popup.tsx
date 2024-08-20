"use client";

import React, { forwardRef } from "react";
import styles from "./popup.module.scss";
import { Text } from "../../text";
import { createPortal } from "react-dom";
import { Button, ButtonProps } from "../../button";

interface Button extends Omit<ButtonProps, "children"> {
  text: string;
}

interface Props {
  title: string;
  button?: Button;
  children: React.ReactNode;
}
export const Popup = forwardRef<HTMLDivElement, Props>(
  ({ title, children, button }, ref) => {
    return (
      <>
        {createPortal(
          <div className={styles.wrapper}>
            <div className={styles.background}></div>
            <div ref={ref} className={styles.centering}>
              <div className={styles.popup}>
                <div className={styles.head}>
                  <Text variant="h2">{title}</Text>
                </div>
                <div className={styles.content}>{children}</div>
              </div>
              {button ? (
                <Button className={styles.button} {...button}>
                  <Text variant="button_primary">{button.text}</Text>
                </Button>
              ) : null}
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }
);

Popup.displayName = "Popup";
