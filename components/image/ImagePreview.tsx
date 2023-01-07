import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, LegacyRef, useRef } from "react";
import { VscStarFull } from "react-icons/vsc";
interface ImagePreviewProps {
  src: string;
  title: string;
  alt: string;
  id: number;
  rate: number;
}
const ImagePreview: FC<ImagePreviewProps> = ({
  rate,
  src,
  title,
  alt,
  id,
}) => {
  const router = useRouter();
  return (
    <li
      className="w-full h-fit relative inline-block group cursor-zoom-in mb-4"
      key={id}
      onClick={(e) => {
        router.push(`/detail/${id}`);
      }}
    >
      <Image
        className="w-full"
        src={src}
        width={100}
        height={100}
        alt={alt}
        loading="lazy"
      />
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end p-6">
      <h1 className="absolute bottom-12 left-3 text-white font-semibold">{title}</h1>
      <VscStarFull className="absolute bottom-5 left-3 text-lg text-yellow-300" />
      <p className="absolute bottom-4 left-9 text-yellow-300">{rate} / 10</p>
      </span>
    </li>
  );
};

export default ImagePreview;
