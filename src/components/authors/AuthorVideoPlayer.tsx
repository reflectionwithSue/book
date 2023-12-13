import { FC, useEffect } from "react";
import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import prevVideoImg from '../../../public/v-bg.png';

export const AuthorVideoPlayer: FC = () => {
  const storage = getStorage();
  const videoRef = ref(storage, "IMG_8221.MP4");
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUri = async () => {
      try {
        /*         const downloadURL = await getDownloadURL(videoRef);
        setVideoUrl(downloadURL); */
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchUri();
  }, []);

  const playerRef = React.useRef(null);

  return (
    <div className="w-full mx-auto mb-5 player lg:w-1/2 h-24 md:h-38 lg:h-44 mt-8 2xl:mt-0">
      <ReactPlayer
        className="react-player"
        url="https://www.youtube.com/watch?v=dMkBJI7vb7c"
        controls={true}
        width="100%"
        height="100%"
        light={prevVideoImg}
      />
    </div>
  );
};
