import { useRef, useEffect, useState, FC } from "react";
import "@/assets/styles/VideoBG.scss";

type VideoBGProps = {
  videoUrl: string | undefined;
};

export const VideoBG:FC<VideoBGProps> = ({ videoUrl }) => {
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;

    if (bgVideo) {
      bgVideo.play();
      bgVideo.playbackRate = 0.7;
    }
  }, []);
  return (
    <video
      muted
      loop
      id="myVideo"
      preload="auto"
      ref={bgVideoRef}
      playsInline
      src={videoUrl}
    />
  );
};
