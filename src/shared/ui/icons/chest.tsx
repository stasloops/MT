import React, { FC } from "react";
import { Icon, IconWrapperProps } from "./icon";
import img from '../images/chest.png'

export const ChestIcon: FC<IconWrapperProps> = ({ ...rest }) => {
  return <Icon src={img} {...rest} />;
};
