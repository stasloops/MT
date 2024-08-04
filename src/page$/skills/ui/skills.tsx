import { CardSkill } from "@/shared/ui/design_system/card_skill";
import { Text } from "@/shared/ui/design_system/text";
import React from "react";
import styles from "./skills.module.scss";

export const Skills = () => {
  const items: any[] = [
    {
      id: 1,
      skin_id: 1,
      title: "Делать зарядку",
      description:
        "Приобретенный скилл не может быть утрачен в течении 30 дней после получения. После истечения 30 дней, происходит переосмотр и скилл будет продлен на 30",
      streak: 4,
    },
    {
      id: 2,
      skin_id: 2,
      title: "Делать зарядку",
      description:
        "Приобретенный скилл не может быть утрачен в течении 30 дней после получения. После истечения 30 дней, происходит переосмотр и скилл будет продлен на 30",
      streak: 78,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Text as="h1" size="title">
        Навыки
      </Text>

      <div className={styles.skills_container}>
        <div className={styles.skills}>
          {items.map((item) => {
            return <CardSkill key={item.id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};
