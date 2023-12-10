import React, { FC, useRef, useState } from "react";
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
import AvTimerRoundedIcon from "@mui/icons-material/AvTimerRounded";
import { styled } from "@mui/material/styles";

type PlayerControlsProps = {
  audioPlayer: null | HTMLAudioElement,
  bgVideo: null | HTMLVideoElement,
}

export const PlayerControls:FC<PlayerControlsProps> = ({ audioPlayer, bgVideo }) => {
  const progressRef = useRef<HTMLProgressElement>(null);

  const [volume, setVolume] = useState<number>(30);
  const [paused, setPaused] = useState<boolean>(false);

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
  const handleProgressClick = (_: Event, value: number | number[]) => {
    if (audioPlayer) {
      const newTime = (audioPlayer.duration * (value as number)) / 100;
      console.log(audioPlayer.duration, value);

      audioPlayer.currentTime = newTime;
    }
  };

  const getProgressValue = () => {
    if (audioPlayer) {
      return (audioPlayer.currentTime * 100) / audioPlayer.duration;
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
    pointerEvents: "auto",
  }));


  const handleTimerClick = () => {
    setVisibleSpeed(!visibleSpeed);
  };

  useEffect(() => {
    if (selectRef.current && visibleSpeed) {
      selectRef.current.focus();
      selectRef.current.size = 4;
    }
  }, [visibleSpeed]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.playbackRate = Number(speed);
    }
  }, [speed]);

  return (
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
            pointerEvents: "auto",
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              pointerEvents: "auto",
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
            pointerEvents: "auto",
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
            pointerEvents: "auto",
          }}
        >
          <IconButton aria-label="previous song" onClick={handleSpeedBackClick}>
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
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

          <IconButton aria-label="next song" onClick={handleSpeedForwardClick}>
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>

          <Box sx={{}} className="speed-box">
            <div>
              <label htmlFor="playback-speed" className="speed-label">
                <IconButton aria-label="timer" onClick={handleTimerClick}>
                  <AvTimerRoundedIcon
                    fontSize="medium"
                    htmlColor={mainIconColor}
                  />
                </IconButton>
              </label>
              {visibleSpeed && (
                <select
                  id="playback-speed"
                  className="speed-select"
                  value={speed}
                  onChange={(event) => {
                    setSpeed(event?.target.value);
                    setVisibleSpeed(false);
                  }}
                  ref={selectRef}
                >
                  <option value="0.5">0.5x</option>
                  <option value="1.0">1.0x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2.0">2.0x</option>
                </select>
              )}
            </div>
          </Box>
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
              pointerEvents: "auto",

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
  );
};
