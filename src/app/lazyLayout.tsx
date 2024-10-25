import React, { useEffect, useLayoutEffect } from "react";
import { BottomMenu, Popup } from "@/shared/ui/design_system";
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
import { TopBar } from "@/widgets/top_bar";
import { configuration_model } from "@/shared/model/configuration";

const LazyLayout = () => {
  const [currentTools, activeTool, changeActiveTool] = useUnit([
    configuration_model.$currentTools,
    configuration_model.$activeTool,
    configuration_model.changeActiveTool,
  ]);
  const [user, isLoading, fetchUser] = useUnit([
    user_model.$user,
    user_model.$isLoading,
    user_model.fetchUserFx,
  ]);

  useEffect(() => {
    let x = 5
    let y = 7
    x = y

    console.log(x, y);
  
  }, []);

  useLayoutEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!user && !isLoading) {
    const auth = async (data: any) => {
      console.log(data);

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
      <TopBar />

      <Router>
        <div className={styles.background}></div>

        <Route component={Profile} />
        <Route component={Skills} />
        <Route component={Items} />
        <Route component={Tasks} />
        <Route component={Settings} />
      </Router>

      <BottomMenu
        items={currentTools}
        activeTab={activeTool}
        onChange={changeActiveTool}
      />
    </div>
  );
};

export default LazyLayout;
