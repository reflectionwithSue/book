import { useRef, useEffect, useState } from "react";
import bg from "../../public/bg-video.mp4";
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
import { Loader } from "@/components/Loader";

export default function Meditation() {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(true);
  const [passedTime, setPassedTime] = useState<string>("00:00");
  const [leftTime, setLeftTime] = useState<string>("07:31");

  useEffect(() => {
    const bgVideo = bgVideoRef.current;

    if (bgVideo) {
      bgVideo.play();
      bgVideo.playbackRate = 0.7;
    }
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

  const audioPlayer = audioPlayerRef.current;
  const progress = progressRef.current;

  useEffect(() => {
    if (audioPlayer && progress) {
      audioPlayer.addEventListener("timeupdate", updateProgress);

      return () => {
        audioPlayer.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  const handleProgressClick = (event:React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
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
      {!isVideoReady ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <>
          <video
            muted
            loop
            id="myVideo"
            preload="auto"
            ref={bgVideoRef}
            playsInline
          >
            <source src={bg} type="video/mp4" />
          </video>
          <div className="card">
            <div className="card__title">Runaway</div>
            <div className="card__subtitle">Smalltown Boy , Shane D</div>
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
          <audio ref={audioPlayerRef}>
            <source src={meditation} />
          </audio>
        </>
      )}
    </>
  );
}
