import React, { FC } from "react";
import styles from "./router.module.scss";
import { Profile } from "@/pages/profile";
import { Items } from "@/pages/items";
import { Tasks } from "@/pages/tasks";
import { Settings } from "@/pages/settings";
import { useUnit } from "effector-react";
import clsx from "clsx";
import { bottom_menu_model } from "@/shared/ui/design_system/bottom_menu";

interface Props {
  children: React.ReactNode[];
}

export const Router: FC<Props> = ({ children }) => {
  const [activeTab] = useUnit([bottom_menu_model.$activeTab]);
  

  return (
    <div
      className={clsx(styles.pages)}
      style={{ transform: `translateX(-${activeTab * 100}vw)` }}
    >
      {children}
    </div>
  );
};
