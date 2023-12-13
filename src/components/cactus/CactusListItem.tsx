import { FC, ReactNode } from "react";

type CactusListItemProps = {
  children: ReactNode;
};

export const CactusListItem:FC<CactusListItemProps> = ({ children }) => (
  <li className="cactus-list-item flex mt-2">
    <p className="text-justify">{children}</p>
  </li>
);