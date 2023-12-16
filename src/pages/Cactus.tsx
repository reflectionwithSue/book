import { CactusSvg } from "@/components/cactus/CactusSvg";
import { CactusText } from "@/components/cactus/CactusText";
import "@/assets/styles/Cactus.scss";
import { FC, useContext, useEffect, useState } from "react";
import { DisplaySizeContext } from "@/components/context/DisplaySizeContext";

export const Cactus: FC = () => {
  const { dispSize } = useContext(DisplaySizeContext);

  const [isLargeDisplay, setIsLargeDisplay] = useState(dispSize > 1024);

  useEffect(() => {
    setIsLargeDisplay(dispSize > 1024);
  }, [dispSize]);

  return (
    <div className="layout">
      <div className="container 2xl:mt-5">
        <div className="flex items-center gap-3">
          <h2 className="text-center text-[1.2rem] sm:text-2xl md:text-3xl 2xl:text-4xl mt-3 mb-5">
            Ключ до техніки "Кактус"
          </h2>
          {!isLargeDisplay && <CactusSvg className="w-28 h-28" />}
        </div>
        <div className="flex flex-col lg:gap-14 lg:flex-row lg:justify-center lg:items-center">
          {isLargeDisplay && <CactusSvg className=" w-96 h-96" />}
          <CactusText />
        </div>
      </div>
    </div>
  );
};
