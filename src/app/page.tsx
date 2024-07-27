"use client";

import { BottomMenu, Header } from "@/shared/ui/design_system";
import React from "react";
import { BookIcon, ChestIcon, MirrorIcon, WheelIcon } from "@/shared/ui/icons";
import styles from "./page.module.scss";
import { Route, Router } from "@/shared/lib/router";
import { Profile } from "@/pagesq/profile";
import { Items } from "@/pagesq/items";
import { Tasks } from "@/pagesq/tasks";
import { Settings } from "@/pagesq/settings";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Header />

      <Router>
        <div className={styles.background}></div>
        <Route component={Profile} />
        <Route component={Items} />
        <Route component={Tasks} />
        <Route component={Settings} />
        <Route component={Items} />
      </Router>

      <BottomMenu
        items={[
          { label: "Профиль", icon: MirrorIcon, width: 36, height: 51 },
          { label: "Предметы", icon: ChestIcon, width: 47, height: 46 },
          { label: "Задания", icon: BookIcon, width: 44, height: 55 },
          { label: "Настройки", icon: WheelIcon, width: 44, height: 45 },
          { label: "Что", icon: MirrorIcon, width: 36, height: 51 },
        ]}
      />
    </div>
  );
}
