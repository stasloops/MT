import React, { FC } from "react";
import { Icon, IconWrapperProps } from "./icon";
import book_png from '../images/book.png'

export const BookIcon: FC<IconWrapperProps> = ({ ...rest }) => {
  return <Icon src={book_png} {...rest} />;
};
