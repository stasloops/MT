"use client";

import React, { FC, useEffect } from "react";
import styles from "./bottom_menu.module.scss";
import clsx from "clsx";
import { vibrateDevice } from "@/shared/lib/utils/vibrateDevice";
import { animated, useSpring, useSprings } from "@react-spring/web";
import { Text } from "../../text";
import { ITool, ToolKey } from "@/shared/model/configuration";

interface Props {
  items: ITool[];
  activeTab: string;
  onChange: (tab: ToolKey) => void;
}

export const BottomMenu: FC<Props> = ({ items, activeTab, onChange }) => {
  const activeTabIndex = items.findIndex((item) => item.key === activeTab);

  const [activeTabBgStyles, apiActiveTabBg] = useSpring(() => ({
    from: {
      x: `${50 * activeTabIndex}%`,
      width: "300%",
    },
  }));
  const [tabs, apiTabs] = useSprings(
    items.length,
    (i) => {
      if (i === activeTabIndex) {
        return { width: "200%" };
      }
      return { width: "100%" };
    },
    []
  );

  const handleClick = (newActiveTab: ToolKey) => {
    // changeAnimationActiveTab(newActiveTab)

    const newActiveTabIndex = items.findIndex(
      (item) => item.key === newActiveTab
    );

    setTimeout(() => {
      onChange(newActiveTab);
      vibrateDevice(500);
      apiActiveTabBg.start({
        from: { x: `${50 * activeTabIndex}%` },
        to: { x: `${50 * newActiveTabIndex}%` },
        immediate: true,
      });
      apiTabs.start((i) => {
        if (i !== newActiveTabIndex) {
          return { width: "100%" };
        }
        return { width: "200%" };
      });
    }, 0);
  };

  useEffect(() => {
    apiActiveTabBg.start({
      from: { width: `${(window.innerWidth / items.length / 1.2) * 2}px` },
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <animated.div
        className={styles.background}
        style={{
          ...activeTabBgStyles,
        }}
      ></animated.div>

      {tabs.map(({ width }, index) => {
        const isActive = activeTabIndex === index;
        const {
          key,
          icon,
          label,
          width: iconWidth,
          height: iconHeight,
        } = items[index];
        const Icon = icon;

        return (
          <animated.div
            onClick={() => handleClick(key)}
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
              width={String(iconWidth) + "px"}
              height={String(iconHeight) + "px"}
            />
            <div className={styles.item_label}>
              <Text
                variant="title_m"
                className={clsx(styles.label, isActive && styles.label_active)}
              >
                {label}
              </Text>
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
