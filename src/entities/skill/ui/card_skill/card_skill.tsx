"use client";

import React, { FC } from "react";
import styles from "./card_skill.module.scss";
import Image from "next/image";
import fire from "../../assets/fire.png";
import { Text } from "@/shared/ui/design_system";
import { ICardSkill } from "../../types";
import { card_skins } from "../../config";

interface Props {
  item: ICardSkill;
  onClick?: () => void;
}

export const CardSkill: FC<Props> = ({ item, onClick }) => {
  const activeSkin = card_skins.find(
    ({ id }: { id: number }) => id === item.skinId
  );

  return (
    <div className={styles.wrapper} onClick={onClick}>
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
