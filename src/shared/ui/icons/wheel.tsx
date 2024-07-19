import React, { FC } from "react";
import { Icon, IconWrapperProps } from "./icon";
import img from '../images/wheel.png'

export const WheelIcon: FC<IconWrapperProps> = ({ ...rest }) => {
  return <Icon src={img} {...rest} />;
};
