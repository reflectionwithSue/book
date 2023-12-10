import { useRef, useEffect, useState } from "react";
import "@/assets/styles/Meditation.scss";
import meditation from "../../public/meditation.mp3";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import Box from "@mui/material/Box";
import { TextInfo } from "@/components/meditation/TextInfo";

export default function Meditation() {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);
  const progress = progressRef.current;

  const [isAudioPlaing, setIsAudioPlaing] = useState<boolean>(false);
  const [passedTime, setPassedTime] = useState<string>("00:00");
  const [leftTime, setLeftTime] = useState<string>("07:31");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [paused, setPaused] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(60);
  const storage = getStorage();
  const videoRef = ref(storage, "bg-video.mp4");
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const audioPlayer = audioPlayerRef.current;
  const bgVideo = bgVideoRef.current;

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

  const handlePlayClick = () => {
    setPaused(!paused);

    if (paused && audioPlayer && bgVideo) {
      audioPlayer.pause();
      bgVideo.pause();
    } else if (!paused && audioPlayer && bgVideo) {
      audioPlayer.play();
      bgVideo.play();
      bgVideo.playbackRate = 0.7;
    }

    if (!isAudioPlaing) {
      setIsAudioPlaing(true);
      if (audioPlayer) {
        audioPlayer.volume = volume / 100;
      }
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

  const handleProgressClick = (_: Event, value: number | number[]) => {
    if (audioPlayer) {
      const newTime = (audioPlayer.duration * (value as number)) / 100;
      console.log(audioPlayer.duration, value);

      audioPlayer.currentTime = newTime;
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

  const handleSpeedForwardClick = () => {
    if (audioPlayer) {
      audioPlayer.currentTime += 10;
    }
  };

  const handleSpeedBackClick = () => {
    if (audioPlayer) {
      audioPlayer.currentTime -= 10;
    }
  };

  const getProgressValue = () => {
    if (audioPlayer) {
      return (audioPlayer.currentTime * 100) / audioPlayer.duration;
    }
  };

  const mainIconColor = "#EDE5D0";

  const Widget = styled("div")(() => ({
    padding: 16,
    borderRadius: 16,
    width: "100%",
    maxWidth: "100%",
    margin: "auto",
    position: "relative",
    zIndex: 1,
    backgroundColor: "#ffffff12",
    backdropFilter: "blur(0.6px)",
  }));

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
          <div className="card__subtitle">
            <TextInfo isAudioPlaing={isAudioPlaing} />
          </div>

          <div className="card__title">Медитація</div>

          <div className="card__controls">
            <Widget>
              <Slider
                aria-label="time-indicator"
                size="small"
                value={getProgressValue()}
                min={0}
                step={1}
                onChange={handleProgressClick}
                sx={{
                  color: "#EDE5D0",
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&:before": {
                      boxShadow: "0 2px 12px 0 rgb(255 255 255 / 16%)",
                    },
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
                    },
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: -2,
                }}
              >
                <span className="card__time-text">{passedTime}</span>
                <span className="card__time-text">-{leftTime}</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: -1,
                }}
              >
                <IconButton
                  aria-label="previous song"
                  onClick={handleSpeedBackClick}
                >
                  <FastRewindRounded
                    fontSize="large"
                    htmlColor={mainIconColor}
                  />
                </IconButton>
                <IconButton
                  aria-label={paused ? "play" : "pause"}
                  onClick={handlePlayClick}
                >
                  {!paused ? (
                    <PlayArrowRounded
                      sx={{ fontSize: "3rem" }}
                      htmlColor={mainIconColor}
                    />
                  ) : (
                    <PauseRounded
                      sx={{ fontSize: "3rem" }}
                      htmlColor={mainIconColor}
                    />
                  )}
                </IconButton>

                <IconButton
                  aria-label="next song"
                  onClick={handleSpeedForwardClick}
                >
                  <FastForwardRounded
                    fontSize="large"
                    htmlColor={mainIconColor}
                  />
                </IconButton>
              </Box>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1, px: 1 }}
                alignItems="center"
                justifyContent="center"
              >
                <VolumeDownRounded htmlColor={mainIconColor} />
                <Slider
                  aria-label="Volume"
                  value={volume}
                  min={0}
                  step={1}
                  max={100}
                  sx={{
                    color: "#EDE5D0",
                    width: "60%",

                    "& .MuiSlider-track": {
                      border: "none",
                    },
                    "& .MuiSlider-thumb": {
                      width: 24,
                      height: 24,
                      backgroundColor: "#EDE5D0",
                      "&:before": {
                        boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                      },
                      "&:hover, &.Mui-focusVisible, &.Mui-active": {
                        boxShadow: "none",
                      },
                    },
                  }}
                  onChange={(_, value) => {
                    setVolume(value as number);
                    if (audioPlayer) {
                      audioPlayer.volume = (value as number) / 100;
                    }
                  }}
                />
                <VolumeUpRounded htmlColor={mainIconColor} />
              </Stack>
            </Widget>
          </div>
        </div>

        <audio ref={audioPlayerRef} onTimeUpdate={updateProgress}>
          <source src={meditation} />
        </audio>
      </section>
    </div>
  );
}
