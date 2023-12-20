import { FiSettings } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "@/components/context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import "@/assets/styles/LayoutTemplate.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const HeaderLayoutTemplate = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [fontSize, setFontSize] = useState<number>(16);

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(theme === "dark");
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef(null);
  
  useEffect(() => {
    setIsDarkTheme(theme === "dark");
  }, [theme, fontSize]);

  useEffect(() => {
    const paragraphs = document.querySelectorAll(".ql-editor p");
    paragraphs.forEach((paragraph) => {
      paragraph.style.fontSize = `${fontSize}px`;
    });
  }, [fontSize]);

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
      click: () => {
        setFontSize((prevFontSize) => prevFontSize - 1);
      },
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
      click: () => {
        setFontSize((prevFontSize) => prevFontSize + 1);
      },
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
        document.getElementById("theme-color")?.setAttribute("content", newTheme === "dark" ? "#432816" : "#ede5d0");
        setOpen(false);
      },
    },
  ];

  return (
    <header className="flex justify-end items-center h-[5vh] w-full gap-5">
      <TransitionGroup>
        {open && (
          <CSSTransition
            key="menu"
            timeout={300}
            classNames="menu"
            appear
            nodeRef={menuRef}
          >
            <div ref={menuRef} className="flex justify-between items-center gap-5 w-full">
              {actions.map((action) => (
                <IconButton
                  key={action.name}
                  onClick={action.click}
                >
                  {action.icon}
                </IconButton>
              ))}
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
      <IconButton
        style={{
          color: isDarkTheme ? "#ede5d0" : "#432816",
        }}
        sx={{
          display: "flex", justifyContent: "flex-end",
          backgroundColor: "transparent",
        }}
        onClick={() => setOpen(!open)}
      >
        <FiSettings />
      </IconButton>
    </header>
  );
};
