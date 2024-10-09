import { Text } from "@/shared/ui/design_system/text";
import React, { useEffect } from "react";
import styles from "./skills_list.module.scss";
import { useUnit } from "effector-react";

import { createPortal } from "react-dom";
import { bottom_menu_model } from "@/shared/ui/design_system/bottom_menu";
import { PlusIcon } from "@/shared/ui/icons";
import { useIsClient, usePopup } from "@/shared/lib";
import { SkillsPopup } from "./popup";
import { List } from "./list";
import {
  CardSkill,
  ICardSkill,
  skill_page_model,
  skills_model,
} from "@/entities/skill";
import { configuration_model } from "@/shared/model/configuration";

export const SkillsList = () => {
  const isClient = useIsClient();
  const { ref, isOpen, setIsOpen } = usePopup();
  const [routePage] = useUnit([skill_page_model.routePage]);
  const [skills, fetchSkills] = useUnit([
    skills_model.$skills,
    skills_model.fetchSkillsFx,
  ]);
  const [activeTab] = useUnit([configuration_model.$activeTool]);

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
    <div className={styles.wrapper}>
      <Text textAlign="center" variant="title_l">
        Навыки
      </Text>

      <List
        itemsData={skills}
        listItem={(item: ICardSkill) => (
          <CardSkill
            onClick={() => routePage({ path: "skill", skill_id: item.id })}
            item={item}
          />
        )}
        ITEM_WIDTH={162}
        ITEM_HEIGHT={214}
        GAP={15}
      />

      {isClient
        ? createPortal(
            <div
              style={{ bottom: activeTab === "skills" ? "110px" : "0" }}
              onClick={openPopup}
              className={styles.add_skill}
            >
              <PlusIcon className={styles.add_skill_icon} />
            </div>,
            document?.body
          )
        : null}

      {isOpen && <SkillsPopup ref={ref} close={closePopup} isOpen={isOpen} />}
    </div>
  );
};
