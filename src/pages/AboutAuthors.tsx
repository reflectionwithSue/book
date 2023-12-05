import { AuthorVideoPlayer } from "@/components/authors/AuthorVideoPlayer";
import { AuthorCard } from "@/components/authors/AuthorCard";
import {
  svgContentIra,
  svgContentGalya,
  svgContentOlya,
} from "@/db/svdContents";
import iraImg from "../../public/iraImg.jpg";
import galyaImg from "../../public/galyaImg.jpeg";
import olyaImg from "../../public/olyaImg.jpg";
import { useEffect, useState } from "react";
import { Author } from "@/types/Author";

export default function AboutAuthors() {
  const [displayedAuthors, setDisplayedAuthors] = useState<Author[]>([]);
  
  const authorsData = [
    {
      id: "Olya",
      description:
        "Психологиня, закохана в психологію. Вмію чути підтекст слів, що говорить людина. Маю здібність формувати різні шляхи дій для клієнтів. Люблю голосно сміятись.",
      imgSrc: olyaImg,
      nameAndRole: svgContentOlya,
      instaLink: "https://www.instagram.com/olga_mur_ua/",
      instaName: "olga_mur_ua"
    },
    {
      id: "Galya",
      description:
        "Цікавлюсь психологією. Обожнюю саморефлексувати, аналізувати і фантазувати. Моє хобі - перегляд якісного кіно, а ще краще, коли воно про реальну людину, яка досягла успіху. Це мене дуже надихає на власні перемоги!",
      imgSrc: galyaImg,
      nameAndRole: svgContentGalya,
      instaLink: "https://www.instagram.com/di_gelen/",
      instaName: "di_gelen"
    },
    {
      id: "Ira",
      description:
        "Графічна дизайнерка, ілюстраторка. Надихаюсь співпрацею з цікавими людьми та люблю проєкти з сенсом. Живу у стилі побажань Уайльда: «Не варто жалкувати про помилки та безумства» :)",
      imgSrc: iraImg,
      nameAndRole: svgContentIra,
      instaLink: "https://www.instagram.com/iren_la_luna/",
      instaName: "iren_la_luna"
    },
  ];

  useEffect(() => {
    const timerIds = authorsData.map((author, index) => {
      const timerId = setTimeout(() => {
        setDisplayedAuthors(prevAuthors => [...prevAuthors, author]);
      }, index * 3800);
      return timerId;
    });

    return () => {
      timerIds.forEach(timerId => clearTimeout(timerId));
    };
  }, []); 

  return (
    <div className="container 2xl:p-0 2xl:mt-5">
      <h2 className="text-center text-[1.3rem] sm:text-2xl md:text-3xl 2xl:text-4xl author-title mb-5">
        Над книгою працювали
      </h2>
      <div className="flex flex-col gap-5 lg:gap-14 lg:flex-row lg:justify-center lg:items-center">
        <section className="flex flex-col gap-3 lg:w-1/2 min-h-[600px] mb-5">
        {displayedAuthors.map((author, index) => (
            <AuthorCard authorData={author} key={author.id} index={index} />
          ))}
        </section>
        <AuthorVideoPlayer />
      </div>
    </div>
  );
}
