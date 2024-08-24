import { Text } from "@/shared/ui/design_system/text";
import React, { useEffect, useState } from "react";
import styles from "./skills.module.scss";
import { useUnit } from "effector-react";
import { skills_model } from "../model";
import { createPortal } from "react-dom";
import { bottom_menu_model } from "@/shared/ui/design_system/bottom_menu";
import { PlusIcon } from "@/shared/ui/icons";
import { useIsClient, usePopup } from "@/shared/lib";
import { CardSkill, ICardSkill } from "@/entities/card_skill";
import { List } from "./list";
import { SkillsPopup } from "./popup";

export const Skills = () => {
  const isClient = useIsClient();
  const { ref, isOpen, setIsOpen } = usePopup();

  const [skills, fetchSkills, removeSkill] = useUnit([
    skills_model.$skills,
    skills_model.fetchSkillsFx,
    skills_model.removeSkill,
  ]);
  const [activeTab] = useUnit([bottom_menu_model.$activeTab]);

  const closePopup = () => {
    setIsOpen(false);
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    fetchSkills();
  }, []);
  return (
    <>
      <div className={styles.wrapper}>
        <Text textAlign="center" variant="h1">
          Навыки
        </Text>

        <List
          itemsData={skills}
          listItem={(item: ICardSkill) => (
            <CardSkill onClick={() => removeSkill(item.id)} item={item} />
          )}
          ITEM_WIDTH={162}
          ITEM_HEIGHT={214}
          GAP={15}
        />

        {isClient
          ? createPortal(
              <div
                style={{ bottom: activeTab === 1 ? "110px" : "0" }}
                onClick={openPopup}
                className={styles.add_skill}
              >
                <PlusIcon className={styles.add_skill_icon} />
              </div>,
              document?.body
            )
          : null}
      </div>

      {isOpen && <SkillsPopup ref={ref} close={closePopup} isOpen={isOpen} />}
    </>
  );
};
