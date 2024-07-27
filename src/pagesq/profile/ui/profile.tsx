import { userModel } from "@/shared/model/user";
import { Text } from "@/shared/ui/design_system/text";
import { LoginButton } from "@telegram-auth/react";
import axios from "axios";
import { useUnit } from "effector-react";
import Image from "next/image";
import React, { useEffect } from "react";

export const Profile = () => {
  const [user, fetchUser] = useUnit([userModel.$user, userModel.fetchUserFx]);

  const auth = async (data: any) => {
    await axios.post("/api/auth", data);
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Text textAlign="center" as="h1" size="title">
        Profile
      </Text>
      <div className="mt-4">
        {user ? (
          <div>
            <Image
              src={user?.avatar || ""}
              width={30}
              height={30}
              priority={true}
              className="rounded-full bg-slate-500"
              alt="logo"
            />
            <div>{user?.name}</div>
          </div>
        ) : (
          <LoginButton
            botUsername={process.env.BOT_USERNAME || "magic_tasks_auth_bot"}
            onAuthCallback={auth}
            buttonSize="large"
            cornerRadius={5}
            showAvatar={true}
            lang="ru"
          />
        )}
      </div>
    </div>
  );
};
