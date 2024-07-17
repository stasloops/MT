"use client";

import { userModel } from "@/shared/model/user";
import { LoginButton } from "@telegram-auth/react";
import axios from "axios";
import { useUnit } from "effector-react";
import Image from "next/image";
import React, { useEffect } from "react";

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
    <div className="h-[100dvh] flex flex-col justify-center items-center gap-3">
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
    </div>
  );
}
