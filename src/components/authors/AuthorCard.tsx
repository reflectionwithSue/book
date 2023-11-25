import { FC } from "react";
import { AuthorSVG } from "@/components/authors/AuthorSVG";
import { Author } from "@/types/Author";

type AuthorCardProp = {
  authorData: Author;
  index: number;
};

export const AuthorCard: FC<AuthorCardProp> = ({ authorData, index }) => {
  const info = (
    <div className="w-3/4 flex flex-col items-center">
      <AuthorSVG paths={authorData.nameAndRole} />
      <p className={`text-xs sm:text-sm md:text-base 2xl:text-xl p-2 text-justify author author-${index} min-h-[128px] max-h-[220px] mt-3`}>{authorData.description}</p>
    </div>
  );

  const avatar = (
    <img
      src={authorData.imgSrc}
      alt={authorData.id}
      className={`w-1/4 h-1/4 rounded-full object-center object-cover author author-img-${index} mt-8`}
    />
  );

  return (
    <div className="flex items-center">
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
