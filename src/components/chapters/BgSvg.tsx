import anime from "animejs/lib/anime.es.js";
import { FC, useEffect } from "react";

type BgSvgProps = { className: string };

export const BgSvg: FC<BgSvgProps> = ({ className }) => {
  useEffect(() => {
    const wave1 =
      "m371.7,185.2l-69.3,0c-92.1,-29 -239.6,-83.9 -303.4,-108.8l0,-77c49.6,4 27.9,25.9 68.5,39.8c40.6,13.9 42,39.7 70.8,38c28.8,-1.7 83.1,-10.5 97.8,11.5c14.7,22 64.3,22.92 75,19.82c10.7,-3.1 23.72,-2.95 27.4,-0.92c3.68,2.03 4.1,2.5 5.8,4.5l2,2c6.7,8 11.7,20.8 16.7,38c3,10.6 3.3,22.4 8.7,33.1z";
    const wave2 =
      "m371.7,185.2l-69.3,0c-92.1,-29 -239.6,-83.9 -303.4,-108.8l0,-77c22.6,17 44,33.7 76.5,32.8c43.1,-1.1 21,49.7 59.8,61.5c38.8,11.8 79.6,-19.5 100.8,-5c21.2,14.5 64.3,22.92 75,19.82c10.7,-3.1 23.72,-2.95 27.4,-0.92c3.68,2.03 4.1,2.5 5.8,4.5l2,2c6.7,8 8.2,21.3 13.2,38.5c3,10.6 6.8,21.9 12.2,32.6z";
    const wave3 =
      "m371.7,185.2l-69.3,0c-92.1,-29 -239.6,-83.9 -303.4,-108.8l0,-77c49.6,4 23.9,46.4 67,39.8c43.1,-6.6 43.5,39.7 72.3,38c28.8,-1.7 62.1,-27 97.8,11.5c35.7,38.5 64.3,22.92 75,19.82c10.7,-3.1 23.72,-2.95 27.4,-0.92c3.68,2.03 4.1,2.5 5.8,4.5l2,2c6.7,8 11.7,20.8 16.7,38c3,10.6 3.3,22.4 8.7,33.1z";

    anime({
      targets: ".bg-st3",
      easing: "linear",
      duration: 7500,
      loop: true,
      d: [{ value: [wave1, wave2] }, { value: wave3 }, { value: wave1 }],
    });

    anime({
      targets: ".bg-st4",
      opacity: [0, 1],
      scale: [1, 1.09],
      duration: 5000,
      easing: "linear",
      direction: "alternate",
      loop: true,
      delay: function (el, i, l) {
        return i * 3000;
      },
    });
  }, []);
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 414.1 185.7"
      xmlSpace="preserve"
      className={className}
    >
      <g
        id="Layer_2_00000152955248338110715740000002258627737009947808_"
        className="bg-st0"
      ></g>
      <g id="Layer_1_00000023261051742503110230000008989395375908447934_">
        <circle className="bg-st2" cx="208.4" cy="87.5" r="60.6" />
        <path
          className="bg-st3"
          d="M369.7,190.2h-69.3C208.3,161.2,60.8,106.3-3,81.4v-77c22.6,17,37,38.7,69.5,37.8c43.1-1.1,30,39.7,68.8,51.5
		s89.6-13.5,110.8,1s37.7,18.9,83.3,16.7c2.7-0.1,5,0.3,7.1,1.2c2.2,1,4.1,2.5,5.8,4.5l0,0c6.7,8,10.2,23.3,15.2,40.5
		C360.5,168.2,364.3,179.5,369.7,190.2z"
        />
        <polygon
          className="bg-st4"
          points="238.4,127.9 246,121.8 236.1,125.5 236.1,117.6 233.3,125.3 227.2,120.7 231.4,127.9 224.8,130.5 
		233,131 235.4,138 235.4,131.7 242.4,134.5 	"
        />
        <path
          className="bg-st5"
          d="M375.9,190.2H-3V37.9c4.4,3.6,9.5,6.9,15.1,9.4C46.6,63,74.7,60.7,102.9,82c35.8,27,61.6,50.3,125.8,47.7
		c20.1-0.8,34.5-3.3,49.9-4.8c15-1.5,27.5-3.7,49.8,3.1c13.4,4.1,21.8,17.1,29,29.6c2.7,4.6,5.2,9.2,7.7,13.1
		C369.2,177.4,372.5,184,375.9,190.2z"
        />
        <polygon
          className="bg-st4"
          points="343.5,112.7 351,106.5 341.2,110.3 341.2,102.3 338.3,110.1 332.2,105.5 336.5,112.7 329.9,115.3 
		338,115.8 340.5,122.8 340.5,116.4 347.4,119.3 	"
        />
        <polygon
          className="bg-st4"
          points="63.5,20.6 60,16.3 62.1,21.9 57.6,21.9 62,23.5 59.4,27 63.5,24.6 64.9,28.3 65.2,23.7 69.2,22.3 
		65.6,22.3 67.2,18.3 	"
        />
      </g>
      <g id="Layer_3"></g>
    </svg>
  );
};
