"use client";

import { userModel } from "@/shared/model/user";
import { BottomMenu } from "@/shared/ui/design_system";
import { LoginButton } from "@telegram-auth/react";
import axios from "axios";
import { useUnit } from "effector-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { BookIcon, ChestIcon, MirrorIcon, WheelIcon } from "@/shared/ui/icons";
import styles from "./page.module.scss";

export default function Home() {
  const [user, fetchUser] = useUnit([userModel.$user, userModel.fetchUserFx]);

  const auth = async (data: any) => {
    await axios.post("/api/auth", data);
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.wrapper}>
      {user?.avatar ? (
        <Image
          src={user?.avatar}
          width={30}
          height={30}
          priority={true}
          className=" rounded-full bg-slate-500"
          alt="logo"
        />
      ) : null}

      <div>{user?.name || "Name"}</div>
      <LoginButton
        botUsername={process.env.BOT_USERNAME || "magic_tasks_auth_bot"}
        onAuthCallback={auth}
        buttonSize="large" // "large" | "medium" | "small"
        cornerRadius={5} // 0 - 20
        showAvatar={true} // true | false
        lang="en"
      />

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
