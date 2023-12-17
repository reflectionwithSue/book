import { FC, useState, useEffect, useContext } from "react";
import { ReactNode } from "react";
import { BgSvg } from "./chapters/BgSvg";
import "@/assets/styles/LayoutTemplate.scss";
import { HeaderLayoutTemplate } from "./chapters/HeaderLayoutTemplate";
import { DisplaySizeContext } from "@/components/context/DisplaySizeContext";

type LayoutsProps = {
  title: string;
  children: ReactNode;
};

export const LayoutTemplate: FC<LayoutsProps> = ({ title, children }) => {
  const { dispSize } = useContext(DisplaySizeContext);

  const [isLargeDisplay, setIsLargeDisplay] = useState(dispSize > 1024);

  useEffect(() => {
    setIsLargeDisplay(dispSize > 1024);
  }, [dispSize]);

  return (
    <div className="layout overflow-y-hidden">
      <section className="flex flex-col justify-center items-center gap-2 p-3 h-full ">
        <HeaderLayoutTemplate />
        <main className="h-[65vh] flex flex-col justify-between items-center gap-2 m-0 w-full">
          <h2 className="text-2xl h-[5vh] w-full flex justify-center items-center">
            {title}
          </h2>
          <div className="flex flex-col w-full">
            <article className="flex justify-center h-[60vh]">
              {children}
            </article>
          </div>
        </main>

        {!isLargeDisplay && (
          <footer className=" sm:h-[8vh]">
            <BgSvg />
          </footer>
        )}
      </section>
    </div>
  );
};
