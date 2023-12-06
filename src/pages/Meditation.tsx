import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faPause,
  faPlay,
  faRotateLeft,
  faRotateRight,
  faVolumeLow,
} from "@fortawesome/free-solid-svg-icons";
import "@/assets/styles/Meditation.scss";
import meditation from "../../public/meditation.mp3";
import { VideoBG } from "@/components/meditation/VideoBG";
import { Loader } from "@/components/Loader";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function Meditation() {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);

  const audioPlayer = audioPlayerRef.current;
  const progress = progressRef.current;

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [passedTime, setPassedTime] = useState<string>("00:00");
  const [leftTime, setLeftTime] = useState<string>("07:31");

  const storage = getStorage();
  const videoRef = ref(storage, "bg-video.mp4");
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUri = async () => {
      try {
        const downloadURL = await getDownloadURL(videoRef);
        setVideoUrl(downloadURL);
        setIsVideoLoaded(true);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchUri();
  }, []);

  const handlePlayClick = () => {
    const audioPlayer = audioPlayerRef.current;

    if (audioPlayer) {
      audioPlayer.play();
      setIsAudioPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };

  const handleProgressClick = (
    event: React.MouseEvent<HTMLProgressElement, MouseEvent>
  ) => {
    if (audioPlayer) {
      const progressBar = event.target as HTMLProgressElement;
      const clickPosition = event.clientX;
      const progressBarRect = progressBar.getBoundingClientRect();
      const progressRatio =
        (clickPosition - progressBarRect.left) / progressBarRect.width;
      const newTime = progressRatio * audioPlayer.duration;

      audioPlayer.currentTime = newTime;
      updateProgress();
    }
  };

  const updateProgress = () => {
    if (audioPlayer) {
      const currentTime = audioPlayer.currentTime;
      const duration = audioPlayer.duration;

      const progressValue = (currentTime / duration) * 100;
      if (progress) {
        progress.value = progressValue;
      }

      setPassedTime(formatTime(currentTime));
      setLeftTime(formatTime(duration - currentTime));
    }
  };

  const handlePauseClick = () => {
    const audioPlayer = audioPlayerRef.current;

    if (audioPlayer) {
      audioPlayer.pause();
      setIsAudioPlaying(false);
    }
  };

  return (
    <>
      {isVideoLoaded ? (
        <section className="meditation">
          <VideoBG videoUrl={videoUrl} />
          <div className="card">
            <div className="card__title">Медитація</div>

            <div className="card__wrapper">
              <div className="card__time card__time-passed">{passedTime}</div>
              <div className="card__timeline">
                <progress
                  value="0"
                  max="100"
                  ref={progressRef}
                  onClick={handleProgressClick}
                ></progress>
              </div>
              <div className="card__time card__time-left">{leftTime}</div>
            </div>
            <div className="card__wrapper">
              <button className="card__btn">
                <FontAwesomeIcon icon={faVolumeLow} />
              </button>
              <button className="card__btn">
                <FontAwesomeIcon icon={faRotateLeft} />
              </button>
              <button className="card__btn">
                {isAudioPlaying ? (
                  <FontAwesomeIcon
                    icon={faPause}
                    size="2xl"
                    onClick={handlePauseClick}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlay}
                    size="2xl"
                    onClick={handlePlayClick}
                  />
                )}
              </button>
              <button className="card__btn">
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
              <button className="card__btn">
                <FontAwesomeIcon icon={faGauge} />
              </button>
            </div>
          </div>
          <audio ref={audioPlayerRef} onTimeUpdate={updateProgress}>
            <source src={meditation} />
          </audio>
        </section>
      ) : (
        <div className="container w-full h-full flex flex-col justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
}
