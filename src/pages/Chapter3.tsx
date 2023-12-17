import { LayoutTemplate } from "@/components/LayoutTemplate";
import { useEffect, useState } from "react";
import { getText } from "@/api/text";
import ReactQuill from "react-quill";
import "quill/dist/quill.bubble.css";
import { Loader } from "@/components/Loader";

export default function Chapter3() {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      const response = await getText(3);
      setContent(response.text);
      setTitle(response.title);
      setIsLoading(false);
    };

    load();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : (
        <LayoutTemplate title={title}>
          <div className="flex justify-center h-full">
            <ReactQuill
              className="quill-custom"
              theme="bubble"
              value={content}
              readOnly={true}
              style={{
                width: "100%",
                height: "100%",
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
}
