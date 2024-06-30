"use client";

import { LoginButton } from "@telegram-auth/react";
import axios from "axios";
import React, { useEffect } from "react";

export default function Home() {
  const auth = async (data: any) => {
    const res = await axios.post("/api/auth", data);
    console.log(res.data);
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.post("/api/user", { data: { name: "Neichh" } });
      console.log(res.data);
    };

    getUser();
  }, []);

  return (
    <div className="App">
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
