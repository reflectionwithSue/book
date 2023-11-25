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
//додати "вітаємо друже, нумо знайомитися"

export default function AboutAuthors() {
  const authorsData = [
    {
      id: "Ira",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas mollitia reprehenderit beatae tempore facilis, dolorum sunt officiis expedita possimus vitae iste. Pariatur tempore quis, ipsam eaque consequatur id nam maiores?",
      imgSrc: iraImg,
      nameAndRole: svgContentIra,
    },
    {
      id: "Galya",
      description:
        "Цікавлюсь психологією. Обожнюю саморефлексувати, аналізувати і фантазувати. Моє хобі - перегляд якісного кіно, а ще краще, коли воно про реальну людину, яка досягла успіху. Це мене дуже надихає на власні перемоги!",
      imgSrc: galyaImg,
      nameAndRole: svgContentGalya,
    },
    {
      id: "Olya",
      description:
        "Психологиня, закохана в психологію. Вмію чути підтекст слів, що говорить людина. Маю здібність формувати різні шляхи дій для клієнтів. Люблю голосно сміятись.",
      imgSrc: olyaImg,
      nameAndRole: svgContentOlya,
    },
  ];

  return (
    <div className="container 2xl:p-0 2xl:mt-5">
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl 2xl:text-4xl author-title">Над книгою працювали</h2>
      <div className="flex flex-col gap-5 lg:gap-14 lg:flex-row lg:justify-center lg:items-center">
        <section className="flex flex-col gap-3 mt-5 lg:w-1/2">
          {authorsData.map((author, index) => (
            <AuthorCard authorData={author} key={author.id} index={index} />
          ))}
        </section>
        <AuthorVideoPlayer />
      </div>
    </div>
  );
}
