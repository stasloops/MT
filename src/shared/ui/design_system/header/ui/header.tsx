import React from "react";
import styles from "./header.module.scss";
import { CoinIcon, NewsIcon } from "@/shared/ui/icons";
import { Text } from "../../text";

export const Header = () => {

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <NewsIcon className={styles.news_icon} />
          <div className={styles.coins}>
            <CoinIcon className={styles.coins_icon} />
            <Text className={styles.coins_count} variant="caption_m">
              30 990
            </Text>
          </div>
        </div>
      </div>
      <div className={styles.fake}></div>
    </>
  );
};
