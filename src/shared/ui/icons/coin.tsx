import React, { FC } from "react";
import { Icon, IconWrapperProps } from "./icon";
import img from "../images/coin.png";

export const CoinIcon: FC<IconWrapperProps> = ({ ...rest }) => {
  return <Icon src={img} {...rest} />;
};
