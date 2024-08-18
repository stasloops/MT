import { CardSkill } from "@/shared/ui/design_system/card_skill";
import { Text } from "@/shared/ui/design_system/text";
import React, { useEffect } from "react";
import styles from "./skills.module.scss";
import { useUnit } from "effector-react";
import { skills_model } from "../model";
import { createPortal } from "react-dom";
import { bottom_menu_model } from "@/shared/ui/design_system/bottom_menu";
import { PlusIcon } from "@/shared/ui/icons";
import { Popup } from "@/shared/ui/design_system";
import { useIsClient, usePopup } from "@/shared/lib";
import { ICardSkill } from "@/shared/ui/design_system/card_skill/types";

export const Skills = () => {
  const [skills, fetchSkills] = useUnit([
    skills_model.$skills,
    skills_model.fetchSkillsFx,
    skills_model.addSkillFx,
  ]);
  const [activeTab] = useUnit([bottom_menu_model.$activeTab]);
  const isClient = useIsClient();
  const { ref, isOpen, setIsOpen } = usePopup();

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <Text textAlign="center" variant="h1">
          Навыки
        </Text>

        <div className={styles.skills_container}>
          <div className={styles.skills}>
            {skills.map((item: ICardSkill) => {
              return <CardSkill key={item.id} item={item} />;
            })}
          </div>
        </div>

        {isClient
          ? createPortal(
              <div
                style={{ bottom: activeTab === 1 ? "110px" : "0" }}
                onClick={() => setIsOpen(true)}
                className={styles.add_skill}
              >
                <PlusIcon className={styles.add_skill_icon} />
              </div>,
              document?.body
            )
          : null}
      </div>

      {isOpen && (
        <Popup
          title="Выбери скин скилла"
          button={{ text: "Подтвердить", onClick: () => console.log("log") }}
          ref={ref}
        >
          <div></div>
        </Popup>
      )}
    </>
  );
};
