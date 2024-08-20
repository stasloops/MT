"use client";

import React, { FC, useState } from "react";
import styles from "./card_skill.module.scss";
import { ICardSkill } from "../types";
import Image from "next/image";
import { card_skins } from "../config";
import fire from "../assets/fire.png";
import { Text } from "@/shared/ui/design_system";

interface Props {
  item: ICardSkill;
}

export const CardSkill: FC<Props> = ({ item }) => {
  const [isDown, setIsDown] = useState(false);
  const activeSkin = card_skins.find(
    ({ id }: { id: number }) => id === item.skinId
  );

  return (
    <div
      style={{ transform: isDown ? "scale(1.05)" : "", transition: "0.3s" }}
      className={styles.wrapper}
      onPointerDown={() => setIsDown(true)}
      onPointerUp={() => setIsDown(false)}
    >
      <Image
        unoptimized={true}
        className={styles.front_bg}
        src={activeSkin?.front || ""}
        alt="card"
      />
      
      {item.streak ? (
        <div className={styles.fire}>
          <div className={styles.fire_container}>
            <Image className={styles.fire_icon} src={fire} alt="fire" />
            <Text
              className={styles.fire_count}
              textAlign="center"
              variant="numeration"
            >
              {item.streak}
            </Text>
          </div>
        </div>
      ) : null}

      <div className={styles.container}>
        <Text variant="h3">{item.title}</Text>
        <Text className={styles.description} variant="description">
          {item.description}
        </Text>
      </div>
    </div>
  );
};
