import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { FC, useState, useEffect, memo } from "react";

type VolumeControlsProps = {
  audioPlayer: HTMLAudioElement;
};

export const VolumeControls: FC<VolumeControlsProps> = memo(
  ({ audioPlayer }) => {
    const [volume, setVolume] = useState<number>(70);
    const [lastVolume, setLastVolume] = useState<number>(volume);
    const mainIconColor = "#EDE5D0";

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
      const newVolume = newValue as number;
      setVolume(newVolume);
      if (audioPlayer) {
        audioPlayer.volume = newVolume / 100;
        setLastVolume(newVolume);
      }
    };

    return (
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
          sx={{
            color: mainIconColor,
            width: "60%",

            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-thumb": {
              width: 24,
              height: 24,
              backgroundColor: mainIconColor,
              "&:before": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
          }}
          onChange={handleVolumeChange}
        />
        <VolumeUpRounded htmlColor={mainIconColor} />
      </Stack>
    );
  }
);
