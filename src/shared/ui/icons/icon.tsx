import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";

interface IconProps {
  width?: string;
  height?: string;
  className?: string;
  src: StaticImageData;
  alt?: string;
}

export type IconWrapperProps = Omit<IconProps, "src">;

export const Icon: FC<IconProps> = ({
  width,
  height,
  className,
  src,
  alt = "",
}) => {
  return (
    <Image
      style={{ width, height }}
      className={className}
      src={src}
      alt={alt}
    />
  );
};
