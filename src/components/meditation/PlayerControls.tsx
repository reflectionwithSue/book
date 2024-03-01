import { FC, useState, memo } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import Box from "@mui/material/Box";
import { VolumeControls } from "./VolumeControls";
import { ProgressControls } from "./ProgressControls";

type PlayerControlsProps = {
  bgVideo: null | HTMLVideoElement;
  isAudioPlaing: boolean;
  setIsAudioPlaing: (value: boolean) => void;
  audioPlayer: HTMLAudioElement;
};

export const PlayerControls: FC<PlayerControlsProps> = memo(
  ({ bgVideo, isAudioPlaing, setIsAudioPlaing, audioPlayer }) => {
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
    }));
    return (
      <div className="card__controls">
        <Widget>
          <ProgressControls audioPlayer={audioPlayer} />
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

            <IconButton
              aria-label="next song"
              onClick={handleSpeedForwardClick}
            >
              <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
          </Box>
{/*           <VolumeControls audioPlayer={audioPlayer} />
 */}        </Widget>
      </div>
    );
  }
);
