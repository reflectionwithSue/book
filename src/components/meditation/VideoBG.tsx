import { useRef, useEffect, useState } from "react";
import bg from "/../public/bg-video.mp4";
import "@/assets/styles/VideoBG.scss";


export const VideoBG = () => {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;

    if (bgVideo) {
      bgVideo.play();
      bgVideo.playbackRate = 0.7;
      setIsVideoReady(true);
    }
  }, []);
  return (
    <video muted loop id="myVideo" preload="auto" ref={bgVideoRef} playsInline>
      <source src={bg} type="video/mp4" />
    </video>
  );
};
