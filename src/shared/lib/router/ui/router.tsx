import React, { FC, useEffect } from "react";
import styles from "./router.module.scss";
import { useUnit } from "effector-react";
import clsx from "clsx";
import { bottom_menu_model } from "@/shared/ui/design_system/bottom_menu";
import { animated, useSpring } from "@react-spring/web";

interface Props {
  children: React.ReactNode[];
}

export const Router: FC<Props> = ({ children }) => {
  const [activeTab] = useUnit([bottom_menu_model.$activeTab]);
  const [springs, api] = useSpring(() => {
    return {
      from: { transform: `translateX(-${activeTab * 100}vw)` },
    };
  });

  useEffect(() => {
    api.start({
      to: { transform: `translateX(-${activeTab * 100}vw)` },
     
    });
  }, [activeTab]);

  return (
    <animated.div className={clsx(styles.pages)} style={{ ...springs }}>
      {children}
    </animated.div>
  );
};
