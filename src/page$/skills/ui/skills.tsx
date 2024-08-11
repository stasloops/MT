import { CardSkill } from "@/shared/ui/design_system/card_skill";
import { Text } from "@/shared/ui/design_system/text";
import React, { useEffect } from "react";
import styles from "./skills.module.scss";
import { useUnit } from "effector-react";
import { skills_model } from "../model";
import { card_skins } from "@/shared/ui/design_system/card_skill/config";
import { createPortal } from "react-dom";
import { bottom_menu_model } from "@/shared/ui/design_system/bottom_menu";
import { PlusIcon } from "@/shared/ui/icons";

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

export const Skills = () => {
  const [skills, fetchSkills, addSkill] = useUnit([
    skills_model.$skills,
    skills_model.fetchSkillsFx,
    skills_model.addSkillFx,
  ]);
  const [activeTab] = useUnit([bottom_menu_model.$activeTab]);

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Text textAlign="center" variant="h1">
        Навыки
      </Text>

      <div className={styles.skills_container}>
        <div className={styles.skills}>
          {skills.map((item: ISkill) => {
            return <CardSkill key={item.id} item={item} />;
          })}
        </div>
      </div>

      {createPortal(
        <div
          style={{ bottom: activeTab === 1 ? "110px" : "0" }}
          onClick={() => addSkill(card_skins[1].id)}
          className={styles.add_skill}
        >
          <PlusIcon   className={styles.add_skill_icon} />
        </div>,
        document.body
      )}
    </div>
  );
};
