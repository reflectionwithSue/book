import { useRef, useEffect, FC } from "react";
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
      muted={true}
      loop={true}
      id="myVideo"
      preload="auto"
      ref={bgVideoRef}
      playsInline={true}
      src={videoUrl}
    />
  );
};
