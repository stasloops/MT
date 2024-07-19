import React, { FC } from "react";
import news_png from "../images/news.png";
import { Icon, IconWrapperProps } from "./icon";

export const NewsIcon: FC<IconWrapperProps> = ({ ...rest }) => {
  return <Icon src={news_png} {...rest} />;
};
