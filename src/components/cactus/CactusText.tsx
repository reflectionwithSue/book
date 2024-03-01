import { FC } from "react";
import { CactusListItem } from "./CactusListItem";
export const CactusText: FC = () => {
  return (
    <div className="flex flex-col justify-center p-2">
      <p className="text-justify mt-3">
        Ціль техніки “Кактус” (автор Марина Панфілова) - дослідження емоцій та
        рис характеру, які найбільше виявляються у вас зараз.
      </p>
      <p className="text-justify mt-3">
        <strong>
          А тепер зіставте інформацію, яка буде описана нижче зі своїм малюнком
          та відповідями на запитання.
        </strong>
      </p>
      <ul className="pl-5 m-0 mt-3">
        <CactusListItem>
          Якщо на вашому кактусі багато голок - це може свідчити{" "}
          <i>про агресивність</i>.
        </CactusListItem>
        <CactusListItem>
          Лінії вашого малюнку сильно наведені чи був натиск, коли ви малювали
          кактус, - це вказує на <i>наявність імпульсивності</i>.
        </CactusListItem>
        <CactusListItem>
          Якщо є багато штрихових ліній - так <i>проявляється тривога</i>.
        </CactusListItem>
        <CactusListItem>
          Є відростки на катусі або інші рослини поруч з ним - це{" "}
          <i>про відкритість</i>.
        </CactusListItem>
        <CactusListItem>
          Кактус посаджений у квітковий горщик (домашній кактус) -{" "}
          <i>про прагнення до домашнього захисту</i>.
        </CactusListItem>
        <CactusListItem>
          Дикий кактус свідчить про <i>свідому чи вимушену самотність</i>.
        </CactusListItem>
        <CactusListItem>
          Якщо кактус зображений по центру і достатньо великий по розміру, то
          ось вам <i>схильність до лідерства</i>.
        </CactusListItem>
        <CactusListItem>
          Якщо ж кактус, навпаки, маленький чи розміщений десь у куточку - це
          <i> про стан невпевненості</i>.
        </CactusListItem>
      </ul>

      <p className="mt-8 text-center md:text-right">
        <strong>Цікаво, а який би кактус зобразила Сью?!</strong>
      </p>
    </div>
  );
};
