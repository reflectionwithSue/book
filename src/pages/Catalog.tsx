import { FC } from "react";
import { Link } from "react-router-dom";

export const Catalog: FC = () => {
  const chaptersList = [
    {
      title: "«Побічний ефект успіху»",
      path: "/pobichnyy-efekt-uspihu",
    },
    {
      title: "«Він цілком нормальний»",
      path: "/vin-cilkom-normalnii",
    },
    {
      title: "«Режим «Коханка»",
      path: "/mistress-mode",
    },
    {
      title: "Медитація",
      path: "/meditation",
    },
    {
      title: "«Вдих-видих. Рівновага»",
      path: "/vdykh-vidykh-rivnovaha",
    },
    {
      title:  "Інформація про авторів",
      path: "/about-authors",
    },
    {
      title:"Ключ до техніки «Кактус»",
      path: "/klyuch-do-tekhniki-kaktus",
    },
  ];
  return (
    <section className="flex flex-col justify-center items-center h-3/4">
      <h1 className="mb-5">Перелік веб-глав</h1>
      <ol className="list-decimal list-outside flex flex-col">
        {chaptersList.map((chapter) => (
          <Link key={chapter.title} to={chapter.path}>
            <li>{chapter.title}</li>
          </Link>
        ))}
      </ol>
    </section>
  );
}
