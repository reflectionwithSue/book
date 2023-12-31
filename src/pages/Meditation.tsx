import { useRef, useEffect, useState, useContext } from "react";
import "@/assets/styles/Meditation.scss";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { TextInfo } from "@/components/meditation/TextInfo";
import { PlayerControls } from "@/components/meditation/PlayerControls";
import meditation from "../../public/meditation.mp3";
import { ThemeContext } from "@/components/context/ThemeContext";

export default function Meditation() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isAudioPlaing, setIsAudioPlaing] = useState<boolean>(false);
  const storage = getStorage();
  const videoRef = ref(storage, "bg-video.mp4");
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const { theme } = useContext(ThemeContext);

  const bgVideo = bgVideoRef.current;
  const audioPlayer = audioPlayerRef.current;

  useEffect(() => {
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

  useEffect(() => {
    document.getElementById("theme-color")?.setAttribute("content", "black");
    return () => {
      document
        .getElementById("theme-color")
        ?.setAttribute("content", theme === "dark" ? "#432816" : "#ede5d0");
    };
  }, []);

  return (
    <div className="bg">
      <section className="meditation">
        <video
          muted={true}
          loop={true}
          preload="auto"
          ref={bgVideoRef}
          playsInline={true}
          id="myVideo"
          src={videoUrl}
        ></video>

        <div className="card">
          <TextInfo isAudioPlaing={isAudioPlaing} />
          <div className="card__title">Медитація</div>
          <PlayerControls
            bgVideo={bgVideo}
            isAudioPlaing={isAudioPlaing}
            setIsAudioPlaing={setIsAudioPlaing}
            audioPlayer={audioPlayer as HTMLAudioElement}
          />
        </div>
      </section>
      <audio ref={audioPlayerRef}>
        <source src={meditation} />
      </audio>
    </div>
  );
}
