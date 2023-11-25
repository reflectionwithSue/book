import { ReactElement } from "react";

export interface Author {
  id: string,
  description: string,
  imgSrc: string,
  nameAndRole: ReactElement,
}