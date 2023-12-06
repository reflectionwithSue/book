import { useRef, useEffect, useState } from "react";
import bg from "../../public/bg-video.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faGauge,
  faPause,
  faPlay,
  faVolumeLow,
} from "@fortawesome/free-solid-svg-icons";
import "@/assets/styles/Meditation.scss";
import meditation from "../../public/meditation.mp3";

export default function Meditation() {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;

    if (bgVideo) {
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

  useEffect(() => {
    const audioPlayer = audioPlayerRef.current;
    const progress = progressRef.current;

    if (audioPlayer && progress) {
      const updateProgress = () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        const progressValue = (currentTime / duration) * 100;
        progress.value = progressValue;
      };

      audioPlayer.addEventListener("timeupdate", updateProgress);

      return () => {
        audioPlayer.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  const handlePauseClick = () => {
    const audioPlayer = audioPlayerRef.current;

    if (audioPlayer) {
      audioPlayer.pause();
      setIsAudioPlaying(false);
    }
  };

  return (
    <>
      <video autoPlay muted loop id="myVideo" preload="auto" ref={bgVideoRef}>
        <source src={bg} type="video/mp4" />
      </video>

      <div className="card">
        <div className="card__title">Runaway</div>
        <div className="card__subtitle">Smalltown Boy , Shane D</div>
        <div className="card__wrapper">
          <div className="card__time card__time-passed">03:34</div>
          <div className="card__timeline">
            <progress value="0" max="100" ref={progressRef}></progress>
          </div>
          <div className="card__time card__time-left">02:04</div>
        </div>
        <div className="card__wrapper">
          <button className="card__btn">
            <FontAwesomeIcon icon={faVolumeLow} />
          </button>
          <button className="card__btn">
            <FontAwesomeIcon icon={faBackward} />
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
            <FontAwesomeIcon icon={faForward} />
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
  );
}
