import { FC } from "react";
import { FiSettings } from "react-icons/fi";
import { ReactNode } from 'react';

type LayoutsProps = {
  title: string;
  children: ReactNode;
};

export const LayoutTemplate: FC<LayoutsProps> = ({ title, children } ) => {
  return (
    <section className="flex flex-col items-center custom-bg p-3">
      <header className="flex justify-end self-end">
        <button className="p-2 rounded-full hover:cursor-pointer hover:bg-[#4c3f370d] active:bg-[#9682760d] dark:hover:bg-[#ede5d038] dark:active:bg-[#ede5d01c]">
          <FiSettings />
        </button>
      </header>
      <main className="h-4/5 flex flex-col justify-between items-center m-5">
        <h2 className="text-xl h-1/6 mb-2 w-5/6 text-center">{title}</h2>
        {children}
      </main>
      <footer></footer>
    </section>
  );
};
