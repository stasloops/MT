
import { ICardSkill } from "@/entities/skill";
import { useTransition, animated } from "@react-spring/web";
import React, { FC, useEffect, useState } from "react";

interface Props {
  itemsData: ICardSkill[];
  ITEM_WIDTH: number;
  ITEM_HEIGHT: number;
  GAP: number;
  listItem: (item: ICardSkill) => React.ReactNode;
}

interface IInsideItem extends ICardSkill {
  index: number;
  x: number;
  y: number;
}

export const List: FC<Props> = ({
  itemsData,
  ITEM_WIDTH,
  ITEM_HEIGHT,
  GAP,
  listItem,
}) => {
  const [insideItems, setInsideItems] = useState<IInsideItem[]>([]);

  useEffect(() => {
    setInsideItems([
      ...itemsData.map((item, idx) => {
        const index = idx + 1;
        const isEven = index % 2 === 0 ? true : false;
        const x = isEven ? ITEM_WIDTH + GAP : 0;
        const row = isEven ? Math.floor(index / 2) - 1 : Math.floor(index / 2);
        const y = (ITEM_HEIGHT + GAP) * row;

        return { ...item, index, x, y };
      }),
    ]);
  }, [JSON.stringify(itemsData)]);

  const transitions = useTransition(insideItems, {
    keys: (item) => item.id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      friction: 10,
    },
  });

  return (
    <div
      style={{
        marginTop: "24px",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          transition: "0.3s",
          width: `${ITEM_WIDTH * 2 + GAP}px`,
          height: `${
            Math.ceil(itemsData.length / 2) * ITEM_HEIGHT + ITEM_HEIGHT
          }px`,
        }}
      >
        {transitions((props, item) => {
          const { x, y, index, ...rest } = item;
          return (
            <animated.div
              key={item.id}
              style={{
                ...props,
                position: "absolute",
                transform: `translate(${x}px,${y}px)`,
                transition: "0.3s",
              }}
            >
              {listItem(item)}
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};
