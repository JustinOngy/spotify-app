"use client";
import { Song } from "@/types";

import getSongs from "@/actions/getSongs";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import Category from "@/components/Category";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400 ">No songs avaliable</div>;
  }
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
        {songs.map((item) => (
          <SongItem
            key={item.id}
            onClick={(id: string) => onPlay(id)}
            data={item}
          />
        ))}
      </div>
      <h1 className="font-semibold text-white text-2xl my-4">Browse all</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl:grid-cols-8 gap-5 mt-5">
        <Category title="Pop" color="bg-red-500" categoryImage="pop" />
        <Category title="Hip-Hop" color="bg-amber-500" categoryImage="hip" />
        <Category title="Country" color="bg-blue-500" categoryImage="country" />
        <Category title="Charts" color="bg-blue-300" categoryImage="charts" />
        <Category title="Rock" color="bg-green-500" categoryImage="rock" />
        <Category title="In the car" color="bg-pink-500" categoryImage="car" />
        <Category
          title="Podcasts"
          color="bg-gray-500"
          categoryImage="podcast"
        />
        <Category
          title="New releases"
          color="bg-purple-500"
          categoryImage="new"
        />
      </div>
    </>
  );
};
export default PageContent;
