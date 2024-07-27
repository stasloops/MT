import React from "react";
import styles from "./router.module.scss";
import { Profile } from "@/pages/profile";
import { Items } from "@/pages/items";
import { Tasks } from "@/pages/tasks";
import { Settings } from "@/pages/settings";
import { useUnit } from "effector-react";
import clsx from "clsx";
import { Header } from "@/shared/ui/design_system";
import { bottom_menu_model } from "@/shared/ui/design_system/bottom_menu";

export const Router = () => {
  const [activeTab] = useUnit([bottom_menu_model.$activeTab]);
  const CONFIG: { id: number; component: any }[] = [
    { id: 0, component: Profile },
    { id: 1, component: Items },
    { id: 2, component: Tasks },
    { id: 3, component: Settings },
  ];

  return (
    <div className={clsx(styles.wrapper, "container")}>
      <Header />
      <div
        className={clsx(styles.pages)}
        style={{ transform: `translateX(-${activeTab * 100}vw)` }}
      >
        <div className="background"></div>
        {CONFIG.map((item) => {
          const Page = item.component;
          return (
            <div className={styles.pages_item}>
              <Page key={item.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
