"use client";

import NextImage from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
// import usePlayer from "@/hooks/usePlayer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  // const player = usePlayer();
  const [isLoading, setIsLoading] = useState(false);
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // return player.setId(data.id);
  };

  useEffect(() => {
    setIsLoading(true);

    const image = new Image();
    image.src = imageUrl || "/images/music-placeholder.png";
    image.onload = () => {
      setIsLoading(false);
    };
  }, [imageUrl]);

  return (
    <>
      {isLoading ? (
        <div>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div className="flex flex-row items-center">
              <Skeleton height={50} width={50} />
              <div className="flex flex-col pl-3">
                <Skeleton height={15} width={70} />
                <Skeleton height={15} width={100} />
              </div>
            </div>
          </SkeletonTheme>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      ">
          <div
            className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        ">
            <NextImage
              fill
              src={imageUrl || "/images/music-placeholder.png"}
              alt="MediaItem"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="text-white truncate">{data.title}</p>
            <p className="text-neutral-400 text-sm truncate">
              By {data.author}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaItem;
