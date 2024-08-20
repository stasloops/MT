import React from "react";
import { BottomMenu, Header } from "@/shared/ui/design_system";
import { BookIcon, ChestIcon, MirrorIcon, WheelIcon } from "@/shared/ui/icons";
import styles from "./page.module.scss";
import { Route, Router } from "@/shared/lib/router";
import { Profile } from "@/page$/profile";
import { Items } from "@/page$/items";
import { Tasks } from "@/page$/tasks";
import { Settings } from "@/page$/settings";
import { Skills } from "@/page$/skills";

const LazyLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />

      <Router>
        <div className={styles.background}></div>

        <Route component={Profile} />
        <Route component={Skills} />
        <Route component={Items} />
        <Route component={Tasks} />
        <Route component={Settings} />
      </Router>

      <BottomMenu
        items={[
          { label: "Профиль", icon: MirrorIcon, width: 36, height: 51 },
          { label: "Навыки", icon: MirrorIcon, width: 36, height: 51 },
          { label: "Предметы", icon: ChestIcon, width: 47, height: 46 },
          { label: "Задания", icon: BookIcon, width: 44, height: 55 },
          { label: "Настройки", icon: WheelIcon, width: 44, height: 45 },
        ]}
      />
    </div>
  );
};

export default LazyLayout;
