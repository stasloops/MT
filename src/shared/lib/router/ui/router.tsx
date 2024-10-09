import React, { FC, useEffect } from "react";
import styles from "./router.module.scss";
import { useUnit } from "effector-react";
import clsx from "clsx";
import { bottom_menu_model } from "@/shared/ui/design_system/bottom_menu";
import { animated, useSpring } from "@react-spring/web";
import { configuration_model } from "@/shared/model/configuration";

interface Props {
  children: React.ReactNode[];
}

export const Router: FC<Props> = ({ children }) => {
  const [activeTool, currentTools] = useUnit([configuration_model.$activeTool, configuration_model.$currentTools]);
  const activeTabIndex = currentTools.findIndex(item => item.key === activeTool);

  const [springs, api] = useSpring(() => {
    return {
      from: { transform: `translateX(-${activeTabIndex * 100}vw)` },
    };
  });

  useEffect(() => {
    api.start({
      to: { transform: `translateX(-${activeTabIndex * 100}vw)` },
     
    });
  }, [activeTabIndex]);

  return (
    <animated.div className={clsx(styles.pages)} style={{ ...springs }}>
      {children}
    </animated.div>
  );
};
