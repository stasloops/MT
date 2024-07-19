import React, { FC } from "react";
import { Icon, IconWrapperProps } from "./icon";
import img from "../images/mirror.png";

export const MirrorIcon: FC<IconWrapperProps> = ({ ...rest }) => {
  return <Icon src={img} {...rest} />;
};
