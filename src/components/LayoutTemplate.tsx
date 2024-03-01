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
  const [isLargeDisplay, setIsLargeDisplay] = useState(dispSize > 913);

  useEffect(() => {
    setIsLargeDisplay(dispSize > 913);
  }, [dispSize]);

  return (
    <div className="layout overflow-y-hidden">
      <section className="flex flex-col items-center gap-2 p-3 h-[100svh] ">
        <HeaderLayoutTemplate />
        {!isLargeDisplay ? (
          <>
            <main className="h-[65svh] flex flex-col justify-between items-center gap-2 m-0 w-full">
              <h2 className="text-xl h-[5svh] w-full text-center flex justify-center items-center">
                {title}
              </h2>
              <div className="flex flex-col w-full">
                <article className="flex justify-center h-[60svh]">
                  {children}
                </article>
              </div>
            </main>
            <footer className=" sm:h-[8svh]">
              <BgSvg className="absolute -inset-x-5 bottom-0" />
            </footer>
          </>
        ) : (
          <main className="h-[80svh] flex justify-between items-center gap-10 m-0 w-11/12 p-4">
            <div className="h-full w-1/2 flex mt-9 justify-center">
              <h2 className="text-[3rem] text-center w-2/3">{title}</h2>
            </div>
            <article className="flex items-center h-[80svh] w-1/2 mt-8">
              {children}
            </article>
            <BgSvg className="h-[38svh] w-[48vw] fixed bottom-0 left-0" />
          </main>
        )}
      </section>
    </div>
  );
};
