import { user_model } from "@/shared/model/user";
import { Text } from "@/shared/ui/design_system/text";
import { LoginButton } from "@telegram-auth/react";
import axios from "axios";
import { useUnit } from "effector-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const Profile = () => {
  const [user, fetchUser] = useUnit([user_model.$user, user_model.fetchUserFx]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Text textAlign="center" variant='title_l'>
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
        ) : null}
        <InstallButton />
      </div>
    </div>
  );
};

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    console.log(deferredPrompt, "dsds");

    if (deferredPrompt) {
      deferredPrompt?.prompt();
      deferredPrompt?.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <button
      onClick={handleInstallClick}
      // disabled={!deferredPrompt}
      style={{ marginTop: "40px", background: "red" }}
    >
      Install App
    </button>
  );
};
