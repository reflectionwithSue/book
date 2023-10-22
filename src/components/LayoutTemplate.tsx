import { FC } from "react";
import { FiSettings } from "react-icons/fi";

type LayoutsProps = {
  title: string;
  text: string;
};

export const LayoutTemplate: FC<LayoutsProps> = ({ title, text }) => {
  return (
    <section className="flex flex-col justify-between items-center custom-bg p-3">
      <header className="flex justify-end self-end">
        <button className="p-2 rounded-full hover:cursor-pointer hover:bg-[#4c3f370d] active:bg-[#9682760d] dark:hover:bg-[#ede5d038] dark:active:bg-[#ede5d01c]">
          <FiSettings />
        </button>
      </header>
      <main className="h-4/5 flex flex-col justify-between m-5">
        <h2 className="text-3xl h-1/6">{title}</h2>
        <p className="h-5/6 w-full p-4 whitespace-normal overflow-scroll hyphens-auto text-justify">
          {text}
        </p>
      </main>
      <footer></footer>
    </section>
  );
};
