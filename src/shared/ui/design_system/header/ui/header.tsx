import React from "react";
import styles from "./header.module.css";
import { NewsIcon } from "@/shared/ui/icons";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <NewsIcon className={styles.news_icon}/>
    </div>
  );
};
