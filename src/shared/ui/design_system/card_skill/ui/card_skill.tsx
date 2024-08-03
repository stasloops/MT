import React, { FC, useState } from "react";
import styles from "./card_skill.module.scss";
import { ICardSkill } from "../types";
import Image from "next/image";
import { card_skins } from "../config";
import { Text } from "../../text";
import fire from "../assets/fire.png";

interface Props {
  item: ICardSkill;
}

export const CardSkill: FC<Props> = ({ item }) => {
  const [isDown, setIsDown] = useState(false);
  const activeSkin = card_skins.find(
    ({ id }: { id: number }) => id === item.skin_id
  );

  return (
    <div
      style={{ transform: isDown ? "scale(1.05)" : "", transition: "0.5s" }}
      className={styles.wrapper}
      onPointerDown={() => setIsDown(true)}
      onPointerUp={() => setIsDown(false)}
    >
      <Image
        className={styles.front_bg}
        src={activeSkin?.front || ""}
        alt="card"
      />
      <div className={styles.fire}>
        <div className={styles.fire_container}>
          <Image className={styles.fire_icon} src={fire} alt="fire" />
          <Text className={styles.fire_count} as="p" size="text-3">
            200
          </Text>
        </div>
      </div>

      <div className={styles.container}>
        <Text size="text-3" as="h5" className={styles.title}>
          {item.title}
        </Text>
        <Text size="text-2" as="h5" font="golos" className={styles.description}>
          {item.description}
        </Text>
      </div>
    </div>
  );
};
