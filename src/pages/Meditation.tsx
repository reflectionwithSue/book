import { useRef, useEffect, useState } from "react";
import "@/assets/styles/Meditation.scss";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { TextInfo } from "@/components/meditation/TextInfo";
import { PlayerControls } from "@/components/meditation/PlayerControls";
import meditation from "../../public/meditation.mp3";

export default function Meditation() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isAudioPlaing, setIsAudioPlaing] = useState<boolean>(false);
  const storage = getStorage();
  const videoRef = ref(storage, "bg-video.mp4");
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const bgVideo = bgVideoRef.current;
  const audioPlayer = audioPlayerRef.current;

  useEffect(() => {
    document.getElementById('status-bar-style').setAttribute('content', 'black');
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
      <audio ref={audioPlayerRef} >
          <source src={meditation} />
        </audio>
    </div>
  );
}