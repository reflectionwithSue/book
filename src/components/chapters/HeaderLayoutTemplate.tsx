import { FiSettings } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/components/context/ThemeContext";

export const HeaderLayoutTemplate = () => {
  const { theme } = useContext(ThemeContext);

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(theme === "dark");

  useEffect(() => {
    setIsDarkTheme(theme === "dark");
    console.log("change theme");
  }, [theme]);

  /*  useEffect(() => {
    // получаю значение темы приложения
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const changeHandler = () => setIsDarkTheme(mediaQuery.matches);

    mediaQuery.addEventListener("change", changeHandler);

    return () => mediaQuery.removeEventListener("change", changeHandler);
  }, []); */

  /* 
  useEffect(() => {
    // Добавляем или удаляем класс в зависимости от текущей темы
    if (isDarkTheme) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    const newTheme = userToggle === null ? !isDarkTheme : !userToggle;
    setUserToggle(newTheme);
    setIsDarkTheme(newTheme);

    // Сохраняем значение темы в localStorage
    localStorage.setItem("theme", String(newTheme));
  };

  */

  /* const toggleTheme = () => {
    // Инвертировать текущее значение темы и установить его
    setIsDarkTheme((prevTheme) => !prevTheme);
  }; */

  return (
    <header className="flex justify-end self-end h-[5vh]">
      <IconButton
        aria-label="delete"
        size="small"
        sx={{ color: isDarkTheme ? "#ede5d0" : "#432816" }}
      >
        <FiSettings />
      </IconButton>
    </header>
  );
};
