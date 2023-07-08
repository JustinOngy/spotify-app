"use client";

import getSongs from "@/actions/getSongs";
interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  return (
    <div>
      <div>
        {songs.map((song) => (
          <div>{song.title}</div>
        ))}
      </div>
    </div>
  );
};
export default PageContent;
