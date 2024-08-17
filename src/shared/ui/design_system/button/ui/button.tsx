"use client";

import React, { FC } from "react";
import styles from "./button.module.scss";
import { Text } from "../../text";

interface Props {
  children: React.ReactNode;
}
export const Button: FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.button}>
          {children}
        </div>
      </div>
    </div>
  );
};
