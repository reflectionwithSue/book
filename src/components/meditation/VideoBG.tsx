import { useRef, useEffect, useState } from "react";
import "@/assets/styles/VideoBG.scss";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const VideoBG = () => {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const storage = getStorage();
  const videoRef = ref(storage, "bg-video.mp4");
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;

    if (bgVideo) {
      bgVideo.play();
      bgVideo.playbackRate = 0.7;
    }

    const fetchUri = async () => {
      try {
        const downloadURL = await getDownloadURL(videoRef);
        setVideoUrl(downloadURL);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchUri();
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
      style={ !videoUrl ? { backgroundColor: "#000" } : { backgroundColor: "transparent" }}
    ></video>
  );
};
