import{ FC, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

type ProgressControlsProps = {
  audioPlayer: HTMLAudioElement;
};

export const ProgressControls: FC<ProgressControlsProps> = ({ audioPlayer }) => {
  const [passedTime, setPassedTime] = useState<string>("00:00");
  const [leftTime, setLeftTime] = useState<string>("07:31");

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.addEventListener("timeupdate", () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        setPassedTime(formatTime(currentTime));
        setLeftTime(formatTime(duration - currentTime));
      });
    }
  }, [audioPlayer]);

  const handleProgressClick = (_: Event, value: number | number[]) => {
    if (audioPlayer) {
      const newTime = (audioPlayer.duration * (value as number)) / 100;
      audioPlayer.currentTime = newTime;
    }
  };

  const getProgressValue = () => {
    if (audioPlayer) {
      return (audioPlayer.currentTime * 100) / audioPlayer.duration;
    }
  };
  return (
    <>
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
    </>
  );
};
