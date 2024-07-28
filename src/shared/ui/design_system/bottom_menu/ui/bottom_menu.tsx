"use client";

import React, { ElementType, FC, useEffect, useState } from "react";
import styles from "./bottom_menu.module.scss";
import clsx from "clsx";
import { useUnit } from "effector-react";
import { bottom_menu_model } from "../model";
import { vibrateDevice } from "@/shared/lib/utils/vibrateDevice";
import { animated, useSpring, useSprings } from "@react-spring/web";

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
  const [activeTabBgStyles, apiActiveTabBg] = useSpring(() => ({
    from: {
      x: `${50 * activeTab}%`,
      width: `${(window?.innerWidth / items.length / 1.2) * 2}px`,
    },
  }));
  const [tabs, apiTabs] = useSprings(
    items.length,
    (i) => {
      if (i === activeTab) {
        return { width: "200%" };
      }
      return { width: "100%" };
    },
    []
  );

  const handleClick = (newActiveTab: number) => {
    vibrateDevice(500);
    changeActiveTab(newActiveTab);
    apiActiveTabBg.start({
      from: { x: `${50 * activeTab}%` },
      to: { x: `${50 * newActiveTab}%` },
      immediate: true,
    });
    apiTabs.start((i) => {
      if (i !== newActiveTab) {
        return { width: "100%" };
      }
      return { width: "200%" };
    });
  };

  return (
    <div className={styles.wrapper}>
      <animated.div
        className={styles.background}
        style={{
          ...activeTabBgStyles,
        }}
      ></animated.div>

      {tabs.map(({ width }, index) => {
        const isActive = activeTab === index;
        const {
          icon,
          label,
          width: iconWidth,
          height: iconHeight,
        } = items[index];
        const Icon = icon;

        return (
          <animated.div
            onClick={() => handleClick(index)}
            onPointerDown={() => vibrateDevice(500)}
            className={clsx(styles.item)}
            style={{ width, transition: "0s" }}
            key={label}
          >
            <div
              className={clsx(styles.item_border, styles.item_border_left)}
            ></div>
            <Icon
              className={clsx(styles.icon, isActive && styles.icon_active)}
              width={iconWidth}
              height={iconHeight}
            />
            <div className={styles.item_label}>
              <div
                className={clsx(styles.label, isActive && styles.label_active)}
              >
                {label}
              </div>
            </div>
            <div
              className={clsx(styles.item_border, styles.item_border_right)}
            ></div>
          </animated.div>
        );
      })}
    </div>
  );
};
