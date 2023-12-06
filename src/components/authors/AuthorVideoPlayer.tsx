import { FC, useEffect } from "react";
import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

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
    <div className="w-3/4 mx-auto mb-5 player md:w-2/3 lg:w-1/2 h-20 md:h-38 lg:h-44">
      {/* <iframe
        title="YouTube Video"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/dMkBJI7vb7c"
        allowFullScreen
      /> */}

      <ReactPlayer
      className="react-player"
        url="https://www.youtube.com/watch?v=dMkBJI7vb7c"
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};
