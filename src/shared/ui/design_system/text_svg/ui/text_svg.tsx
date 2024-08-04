import svg from "./text.svg";
import Image from "next/image";
export const TextSvg = ({ text }: any) => {
  if (!text) return null;

  return (
    <>
      <Image src={svg} alt="da" />
    </>
  );
  //   <text
  //     className={clsx(supercell.className, styles.text)}
  //     fontFamily={fontFamily}
  //     fontSize={11}
  //     fontWeight={700}
  //     fill={fill || "#Fff"}
  //     stroke={stroke || "#000"}
  //     strokeWidth={strokeWidth || 1}
  //     {...rest} // Передаем остальные пропсы
  //   >
  //     {text.split("\n").map((line, index) => (
  //       <tspan
  //         stroke="#000"
  //         strokeWidth={1}
  //         key={index}
  //         x={0}
  //         dy={index === 0 ? 0 : fontSize}
  //       >
  //         {line}
  //       </tspan>
  //     ))}
  //   </text>
  // </svg>
};
