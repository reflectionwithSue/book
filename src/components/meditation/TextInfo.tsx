import { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";

type TextInfoProps = {
  isAudioPlaing: boolean;
};

export const TextInfo: FC<TextInfoProps> = ({ isAudioPlaing }) => {
  const nodeRef = useRef(null);

  return (
    <div className="card__subtitle">
      <CSSTransition
        in={!isAudioPlaing}
        timeout={2000}
        classNames="my-node"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="card__text-container">
          <span className="card__text">
            Звільніть кілька хвилин для себе та приготуйтеся відпустити
            повсякденні турботи.
          </span>
          <span className="card__text">
            Рекомендуємо одягнути навушники, знайти спокійне місце, де вам буде
            зручно сидіти чи лежати.
          </span>
          <span className="card__text">
            Бажаємо приємної подорожі у власний внутрішній світ.
          </span>
        </div>
      </CSSTransition>
    </div>
  );
};
