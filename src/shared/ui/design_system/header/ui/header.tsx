import React from "react";
import styles from "./header.module.scss";
import { NewsIcon } from "@/shared/ui/icons";
import { Text } from "../../text";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <NewsIcon className={styles.news_icon} />
      <div className={styles.coins}>
        {/* <CoinIcon className={styles.coins_icon} /> */}
        <Text as="p" size="text-3" className={styles.coins_count}>
          30 990
        </Text>
      </div>
    </div>
  );
};
