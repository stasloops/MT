import { Text } from "@/shared/ui/design_system/text";
import React, { useState } from "react";
import styles from "./skills.module.scss";
import { useUnit } from "effector-react";
import { skills_model } from "../model";
import { createPortal } from "react-dom";
import { bottom_menu_model } from "@/shared/ui/design_system/bottom_menu";
import { PlusIcon } from "@/shared/ui/icons";
import { Popup } from "@/shared/ui/design_system";
import { useIsClient, usePopup } from "@/shared/lib";
import { userModel } from "@/shared/model/user";
import Image from "next/image";
import { card_skins, CardSkill, ICardSkill } from "@/entities/card_skill";

export const Skills = () => {
  const isClient = useIsClient();
  const { ref, isOpen, setIsOpen } = usePopup();
  const [skills] = useUnit([skills_model.$skills]);
  const [user] = useUnit([userModel.$user]);
  const skillCardSkins = user?.skillCardSkins;
  const [activeTab] = useUnit([bottom_menu_model.$activeTab]);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleActiveCard = (id: number) => {
    if (id === activeCardId) {
      return setActiveCardId(null);
    }
    setActiveCardId(id);
  };
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
          title="Выбери карту скилла"
          button={{
            text: "Подтвердить",
            onClick: () => console.log("log"),
            isDisabled: activeCardId ? false : true,
          }}
          ref={ref}
        >
          <div className={styles.popup}>
            {skillCardSkins?.map(({ id, quantityLeft, skinId }) => {
              const front = card_skins.find((s) => s.id === skinId)?.front;
              const isActive = activeCardId === id;
              return (
                <div
                  key={id}
                  className={styles.popup_item}
                  style={{ opacity: isActive ? "0.6" : "", transition: "0.1s" }}
                  onClick={() => quantityLeft >= 1 && handleActiveCard(id)}
                >
                  <Image unoptimized src={front || ""} alt="alt" />

                  <div className={styles.popup_item_count}>
                    <Text variant="h3">
                      {isActive ? quantityLeft - 1 : quantityLeft}
                    </Text>
                  </div>

                  <div className={styles.popup_item_label}>
                    <Text variant="h3">
                      {isActive ? "Выбранно" : "Выбрать"}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Popup>
      )}
    </>
  );
};
