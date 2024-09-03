"use client";

import React, { ElementType, FC, useEffect } from "react";
import styles from "./bottom_menu.module.scss";
import clsx from "clsx";
import { useUnit } from "effector-react";
import { bottom_menu_model } from "../model";
import { vibrateDevice } from "@/shared/lib/utils/vibrateDevice";
import { animated, useSpring, useSprings } from "@react-spring/web";
import { Text } from "../../text";

interface Props {
  items: {
    label: string;
    icon: ElementType;
    width: number;
    height: number;
  }[];
}

export const BottomMenu: FC<Props> = ({ items }) => {
  const [activeTab, changeActiveTab, $swipeTransition, changeAnimationActiveTab] = useUnit([
    bottom_menu_model.$activeTab,
    bottom_menu_model.changeActiveTab,
    bottom_menu_model.$swipeTransition,
    bottom_menu_model.changeAnimationActiveTab
  ]);
  const [activeTabBgStyles, apiActiveTabBg] = useSpring(() => ({
    from: {
      x: `${50 * activeTab}%`,
      width: "300%",
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
    changeAnimationActiveTab(newActiveTab)

    setTimeout(() => {
      changeActiveTab(newActiveTab);
      vibrateDevice(500);
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
    }, $swipeTransition)
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
              <Text
                variant="h3"
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
