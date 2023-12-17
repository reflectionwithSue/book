import { FiSettings } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/components/context/ThemeContext";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import "@/assets/styles/LayoutTemplate.scss";

export const HeaderLayoutTemplate = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(theme === "dark");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark");
  }, [theme]);

  const actions = [
    {
      icon: (
        <TextDecreaseIcon
          style={{
            color: isDarkTheme ? "#ede5d0" : "#432816",
          }}
        />
      ),
      name: "TextDecrease",
    },
    {
      icon: (
        <TextIncreaseIcon
          style={{
            color: isDarkTheme ? "#ede5d0" : "#432816",
          }}
        />
      ),
      name: "TextIncrease",
    },
    {
      icon: isDarkTheme ? (
        <LightModeIcon
          style={{
            color: isDarkTheme ? "#ede5d0" : "#432816",
          }}
        />
      ) : (
        <DarkModeIcon
          style={{
            color: isDarkTheme ? "#ede5d0" : "#432816",
          }}
        />
      ),
      name: isDarkTheme ? "LightMode" : "DarkMode",
      click: () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        setOpen(false);
      },
    },
  ];

  /* const changeFontSize = (newSize: string) => {
    const paragraphs = contentRef.current.querySelectorAll("p");

    paragraphs.forEach((paragraph) => {
      paragraph.style.fontSize = newSize;
    });
  }; */

  return (
    <header className="flex justify-end h-[5vh] w-full">
      <SpeedDial
        ariaLabel="toolsBar"
        sx={{ display: "flex", justifyContent: "flex-end" }}
        icon={
          <IconButton
            style={{
              color: isDarkTheme ? "#ede5d0" : "#432816",
            }}
            sx={{
              backgroundColor: "transparent",
            }}
            onClick={() => setOpen(!open)}
          >
            <FiSettings />
          </IconButton>
        }
        direction="left"
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={action.click}
            className="custom-speed-dial-action"
          />
        ))}
      </SpeedDial>
    </header>
  );
};
