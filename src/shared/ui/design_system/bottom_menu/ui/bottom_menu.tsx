"use client";

import React, { FC, useState } from "react";
import styles from "./bottom_menu.module.scss";
import clsx from "clsx";

interface Props {
  items: { label: string; icon: any; width: number; height: number }[];
}

export const BottomMenu: FC<Props> = ({ items }) => {
  const [activeTab, setActiveTab] = useState(items[0]?.label);

  const handleClick = (label: string) => {
    setActiveTab(label);
  };
  return (
    <div className={styles.wrapper}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.label;
        return (
          <div
            onClick={() => handleClick(item.label)}
            className={clsx(styles.item, isActive && styles.item_active)}
          >
            <Icon
              className={clsx(styles.icon, isActive && styles.icon_active)}
              width={item.width}
              height={item.height}
            />
            <div className={clsx(styles.label, isActive && styles.label_active)}>
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
