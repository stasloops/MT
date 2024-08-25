import React, { useEffect, useLayoutEffect, useState } from "react";
import { BottomMenu, Header, Popup } from "@/shared/ui/design_system";
import { BookIcon, ChestIcon, MirrorIcon, WheelIcon } from "@/shared/ui/icons";
import styles from "./page.module.scss";
import { Route, Router } from "@/shared/lib/router";
import { Profile } from "@/page$/profile";
import { Items } from "@/page$/items";
import { Tasks } from "@/page$/tasks";
import { Settings } from "@/page$/settings";
import { Skills } from "@/page$/skills";
import { user_model } from "@/shared/model/user";
import { useUnit } from "effector-react";
import { LoginButton } from "@telegram-auth/react";
import axios from "axios";
import Loading from "./loading";

const LazyLayout = () => {
  const [insideLoading, setInsideLoading] = useState(true);
  const [user, isLoading, fetchUser] = useUnit([
    user_model.$user,
    user_model.$isLoading,
    user_model.fetchUserFx,
  ]);

  useLayoutEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setInsideLoading(false);
      },1000);
    }
  }, [isLoading]);

  if (insideLoading) {
    return <Loading />;
  }

  if (!user && !insideLoading) {
    const auth = async (data: any) => {
      await axios.post("/api/auth", data);
      await fetchUser();
    };
    return (
      <Popup title="Вход">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoginButton
            botUsername={process.env.BOT_USERNAME || "magic_tasks_auth_bot"}
            onAuthCallback={auth}
            buttonSize="large"
            cornerRadius={5}
            showAvatar={true}
            lang="ru"
          />
        </div>
      </Popup>
    );
  }

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
