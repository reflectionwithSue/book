import { FC, useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { ReactNode } from "react";
import day from "../../public/day.svg";
import night from "../../public/night.svg";

type LayoutsProps = {
  title: string;
  children: ReactNode;
};

export const LayoutTemplate: FC<LayoutsProps> = ({ title, children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    // получаю значение темы приложения
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const changeHandler = () => setIsDarkTheme(mediaQuery.matches);

    mediaQuery.addEventListener('change', changeHandler);

    return () => mediaQuery.removeEventListener('change', changeHandler);
  }, []);

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

  const toggleTheme = () => {
    // Инвертировать текущее значение темы и установить его
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <section className="flex flex-col items-center p-3 ">
      <header className="flex justify-end self-end h-[5vh]">
        <button  onClick={toggleTheme} className="w-full h-3/4 p-2 rounded-full hover:cursor-pointer hover:bg-[#4c3f370d] active:bg-[#9682760d] dark:hover:bg-[#ede5d038] dark:active:bg-[#ede5d01c]">
          <FiSettings />
        </button>
      </header>
      <main className="h-[95vh] flex flex-col justify-between items-center m-0 w-full">
        <h2 className="text-2xl h-[5vh] mb-7 w-5/6 text-center">{title}</h2>
        <div className="flex flex-col md:flex-row w-full">
          <article className="flex justify-center h-[70vh] md:order-last md:flex-auto md:basis-2/4">
            {children}
          </article>
          <section className="h-[80vh] w-[55vw]">
            <img src={isDarkTheme ? night :day} alt="88" width={'100%'} height={'100%'}/>
          </section>
        </div>
      </main>
    </section>
  );
};
