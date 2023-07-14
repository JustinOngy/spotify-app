import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NextImage from "next/image";

interface CategoryProps {
  title: string;
  color: string;
  categoryImage: string;
}

const Category: React.FC<CategoryProps> = ({ title, color, categoryImage }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const handleSearchClick = () => {
    router.push("/search");
  };

  useEffect(() => {
    const image = new Image();
    image.src = `/images/${categoryImage}.jpeg`;
    image.onload = () => {
      setIsLoading(false);
    };
  }, [categoryImage]);

  return (
    <>
      {isLoading ? (
        <div>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={20} width={100} />
            <Skeleton
              height={200}
              width={180}
              className="flex flex-col pr-10"
            />
          </SkeletonTheme>
        </div>
      ) : (
        <div
          onClick={handleSearchClick}
          className={`${color} relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 cursor-pointer transition p-3`}>
          <div className="relative aspect-square w-full h-full rounded-md overflow-hidden "></div>
          <div className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="absolute top-5 left-5 font-semibold text-2xl z-[1] ">
              {title}
            </p>
            <NextImage
              src={`/images/${categoryImage}.jpeg`}
              alt="category image"
              className="w-[100px] h-[100px] absolute bottom-1 right-0 transform rotate-12 md:w-[150px] md:h-[150px] "
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
