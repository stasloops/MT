"use client";

import { LoginButton } from "@telegram-auth/react";
import React from "react";

export default function Home() {
  return (
    <div className="App">
      <LoginButton
        botUsername={process.env.BOT_USERNAME || "magic_tasks_auth_bot"}
        onAuthCallback={(data) => {
          console.log(data);
          // call your backend here to validate the data and sign in the user
        }}
        buttonSize="large" // "large" | "medium" | "small"
        cornerRadius={5} // 0 - 20
        showAvatar={true} // true | false
        lang="en"
      />
    </div>
  );
}
