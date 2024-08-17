"use client";

import React, { forwardRef } from "react";
import styles from "./popup.module.scss";
import { Text } from "../../text";
import { createPortal } from "react-dom";

interface Props {
  title: string;
  children: React.ReactNode;
}
export const Popup = forwardRef<HTMLDivElement, Props>(
  ({ title, children }, ref) => {
    return (
      <>
        {createPortal(
          <div className={styles.wrapper}>
            <div className={styles.background}></div>
            <div className={styles.centering}>
              <div ref={ref} className={styles.popup}>
                <div className={styles.head}>
                  <Text variant="h2">{title}</Text>
                </div>
                <div className={styles.content}>{children}</div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }
);

Popup.displayName = 'Popup';