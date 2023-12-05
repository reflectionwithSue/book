import anime from "animejs/lib/anime.es.js";
import { FC, ReactElement, useEffect, useRef } from "react";

type AuthorSVGProps = {
  paths: ReactElement;
};

export const AuthorSVG: FC<AuthorSVGProps> = ({ paths }) => {
  const lettersRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const letters = lettersRef.current?.querySelectorAll("path");    

    const timeline = anime.timeline({
      duration: 1500,
      easing: "easeInOutExpo",
    });

    timeline.add({
      targets: letters,
      strokeDashoffset: [anime.setDashoffset, 0],
      delay: anime.stagger(190),
    });
  }, [paths]);
  return (
      <svg
        className="w-2/4 h-2/4 lg:w-1/2 lg:h-1/2 author-svg"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 497.6 176.1"
      >
        <g id="Layer_1" ref={lettersRef}>
          {paths}
        </g>
        <g id="Layer_2"></g>
        <g id="Layer_3"></g>
        <g id="Layer_4"></g>
      </svg>
  );
};
