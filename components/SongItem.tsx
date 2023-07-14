"use client";

import useLoadImage from "@/hooks/useLoadImage";
import NextImage from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Song } from "@/types";
import PlayButton from "./PlayButton";
import { useEffect, useState } from "react";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const image = new Image();
    image.src = imagePath || "/images/liked.png";
    image.onload = () => {
      setIsLoading(false);
    };
  }, [imagePath]);

  return (
    <>
      {isLoading ? (
        <div>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton
              height={200}
              width={180}
              className="flex flex-col pr-10"
            />
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={70} />
          </SkeletonTheme>
        </div>
      ) : (
        <div
          onClick={() => onClick(data.id)}
          className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
          <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
            <NextImage
              className="object-cover"
              src={imagePath || "/images/liked.png"}
              fill
              alt="image"
            />
          </div>
          <div className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="font-semibold truncate w-full">{data.title}</p>
            <p className="text-neutral-400 text-sm pb-4 w-full truncate">
              By {data.author}
            </p>
          </div>
          <div className="absolute bottom-24 right-5">
            <PlayButton />
          </div>
        </div>
      )}
    </>
  );
};

export default SongItem;
