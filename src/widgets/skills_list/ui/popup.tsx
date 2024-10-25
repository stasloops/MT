import { Popup, Text } from "@/shared/ui/design_system";
import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import styles from "./skills_list.module.scss";
import { user_model } from "@/shared/model/user";
import { card_skins, skills_model } from "@/entities/skill";

interface Props {
  close: () => void;
  isOpen: boolean;
}
export const SkillsPopup = forwardRef<HTMLDivElement, Props>(
  ({ close, isOpen }, ref) => {
    const [addSkill] = useUnit([skills_model.addSkillFx]);
    const [user] = useUnit([user_model.$user]);
    const skillCardSkins = user?.skillCardSkins;

    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    const handleActiveCard = (id: number) => {
      if (id === activeCardId) {
        return setActiveCardId(null);
      }
      setActiveCardId(id);
    };

    const createSkill = async () => {
      const skinId = skillCardSkins?.find(
        (item) => item.id === activeCardId
      )?.skinId;

      await addSkill(skinId || 0);

      close();

      setActiveCardId(null);
    };

    useEffect(() => {
      setActiveCardId(null);
    }, [isOpen]);

    return (
      <Popup
        title="Выбери карту скилла"
        button={{
          text: "Подтвердить",
          onClick: createSkill,
          isDisabled: activeCardId ? false : true,
          variant: 'primary'
        }}
        ref={ref}
      >
        <div className={styles.popup}>
          {skillCardSkins
            ?.sort((a, b) => b.quantityLeft - a.quantityLeft)
            .map(({ id, quantityLeft, skinId }) => {
              const bg_image = card_skins.find((s) => s.id === skinId)?.back;
              const is_active = activeCardId === id;
              return (
                <div
                  key={id}
                  className={styles.popup_item}
                  style={{
                    opacity: is_active || !quantityLeft ? "0.6" : "",
                    transition: "0.1s",
                  }}
                  onClick={() => quantityLeft >= 1 && handleActiveCard(id)}
                >
                  <Image unoptimized src={bg_image || ""} alt="alt" />

                  <div className={styles.popup_item_count}>
                    <Text variant='title_m'>
                      {is_active ? quantityLeft - 1 : quantityLeft}
                    </Text>
                  </div>

                  <div className={styles.popup_item_label}>
                    <Text variant='title_m'>{is_active ? "Выбрано" : "Выбрать"}</Text>
                  </div>
                </div>
              );
            })}
        </div>
      </Popup>
    );
  }
);

SkillsPopup.displayName = "SkillsPopup";
