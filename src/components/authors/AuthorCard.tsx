import { FC } from "react";
import { AuthorSVG } from "@/components/authors/AuthorSVG";
import { Author } from "@/types/Author";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

type AuthorCardProp = {
  authorData: Author;
  index: number;
};

export const AuthorCard: FC<AuthorCardProp> = ({ authorData, index }) => {
  const info = (
    <div className="w-3/4 flex flex-col items-center">
      <AuthorSVG paths={authorData.nameAndRole} />
      <p
        className={`text-xs sm:text-sm md:text-base 2xl:text-xl p-2 text-left author author-${index} min-h-[128px] max-h-[220px] mt-3`}
      >
        {authorData.description}
      </p>
    </div>
  );

  const avatar = (
    <div className="flex flex-col w-1/4 h-1/4 justify-center items-center gap-1">
      <img
        src={authorData.imgSrc}
        alt={authorData.id}
        className={`rounded-full object-center object-cover author author-img-${index} mt-8`}
      />
      <div className={`w-1/12 h-1/12 flex justify-center items-center -skew-y-6 author author-insta-${index}`}>
        <FontAwesomeIcon icon={faInstagram} className="insta-logo" />
        <NavLink
          to={authorData.instaLink}
          target="_blank"
          className="ml-1 text-xs sm:text-sm md:text-base 2xl:text-xl"
        >
          {" "}
          {authorData.instaName}
        </NavLink>
      </div>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      {index === 1 ? (
        <>
          {info}
          {avatar}
        </>
      ) : (
        <>
          {avatar}
          {info}
        </>
      )}
    </div>
  );
};
