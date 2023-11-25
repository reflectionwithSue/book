import { LayoutTemplate } from "@/components/LayoutTemplate";
import { FC, useEffect, useRef, useState } from "react";
import { getText } from "@/api/text";
import ReactQuill from "react-quill";
import "quill/dist/quill.bubble.css";
import { Loader } from "@/components/Loader";

const Chapter1: FC = () => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await getText(1);
      console.log(response);
      
      setContent(response.text);
      setTitle(response.title);
      setTimeout(() => {
        setIsLoading(false);

      }, 1000)
    };
    load();
  }, []);

  /* const changeFontSize = (newSize: string) => {
    const paragraphs = contentRef.current.querySelectorAll("p");

    paragraphs.forEach((paragraph) => {
      paragraph.style.fontSize = newSize;
    });
  }; */

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : (
        <LayoutTemplate title={title}>
          <div ref={contentRef}>
            <ReactQuill
              theme="bubble"
              value={content}
              readOnly={true}
              style={{
                width: "100%",
                height: "80%",
                border: "1px solid black",
              }}
              modules={{
                clipboard: {
                  matchVisual: false,
                },
                
              }}
            />
          </div>
        </LayoutTemplate>
      )}
    </>
  );
};

export default Chapter1;
