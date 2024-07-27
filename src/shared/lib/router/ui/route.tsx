import React, { FC } from "react";
import styles from "./router.module.scss";

interface Props {
  component: React.FC;
}

export const Route: FC<Props> = ({ component: Component }) => {
  return (
    <div className={styles.pages_item}>
      <Component />
    </div>
  );
};
