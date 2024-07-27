"use client";

import React, { ElementType, FC, useEffect, useState } from "react";
import styles from "./bottom_menu.module.scss";
import clsx from "clsx";
import { useUnit } from "effector-react";
import { bottom_menu_model } from "../model";

interface Props {
  items: {
    label: string;
    icon: ElementType;
    width: number;
    height: number;
  }[];
}

export const BottomMenu: FC<Props> = ({ items }) => {
  const [activeTab, changeActiveTab] = useUnit([
    bottom_menu_model.$activeTab,
    bottom_menu_model.changeActiveTab,
  ]);
  const [activeBlockPercentWidth, setActiveBlockPercentWidth] =
    useState<number>(0);

  const handleClick = (activeTab: number) => {
    changeActiveTab(activeTab);
  };

  useEffect(() => {
    setActiveBlockPercentWidth((window.innerWidth / items.length / 1.2) * 2);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.background}
        style={{
          width: `${activeBlockPercentWidth}px`,
          transform: `translateX(${50 * activeTab}%)`,
        }}
      ></div>

      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeTab === index;
        return (
          <div
            onClick={() => handleClick(index)}
            className={clsx(styles.item, isActive && styles.item_active)}
            key={item.label}
          >
            <div
              className={clsx(styles.item_border, styles.item_border_left)}
            ></div>
            <Icon
              className={clsx(styles.icon, isActive && styles.icon_active)}
              width={item.width}
              height={item.height}
            />
            <div className={styles.item_label}>
              <div
                className={clsx(styles.label, isActive && styles.label_active)}
              >
                {item.label}
              </div>
            </div>
            <div
              className={clsx(styles.item_border, styles.item_border_right)}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
