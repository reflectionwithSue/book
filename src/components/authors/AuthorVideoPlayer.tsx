import { FC, useEffect } from "react";
import React, { useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import video from "../../../public/video.mp4";

export const AuthorVideoPlayer: FC = () => {
  const storage = getStorage();
  const videoRef = ref(storage, "IMG_8221.MP4");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUri = async () => {
      try {
                const downloadURL = await getDownloadURL(videoRef);
        
/*         const downloadURL = video;
 */        setVideoUrl(downloadURL);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchUri();
  }, []);

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoUrl,
        type: "video/mp4",
      },
    ],
    playbackRates: [0.5, 1, 1.5, 2],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
  );
};

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className="w-3/4 mx-auto mb-5 player md:w-2/3 lg:w-1/2">
      <div ref={videoRef} />
    </div>
  );
};
