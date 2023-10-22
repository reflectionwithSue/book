import { FC } from "react";
import * as text from "@/db/chapter1.json";
import { LayoutTemplate } from "@/components/LayoutTemplate";

const Chapter1: FC = () => {
  return (
    <LayoutTemplate title={text.title} text={text.text} />
  );
};

export default Chapter1;
