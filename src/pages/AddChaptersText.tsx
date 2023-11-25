import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { getText, updateText } from "@/api/text";
import Snackbar from '@mui/material/Snackbar';

type Chapter = {
  id: number;
  title: string;
};
export const AddChaptersText = () => {
  const chaptersList = [
    { id: 0, title: "Обрати главу" },
    { id: 1, title: "Побічний ефект успіху" },
    { id: 2, title: "Він цілком нормальний" },
    { id: 3, title: "Режим «Коханка»" },
    { id: 4, title: "Вдих-видих. Рівновага" },
  ];
  const [open, setOpen] = useState(false);
  const [text, setText] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(
    chaptersList[0]
  );
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = event.target.value;
    const chapter = chaptersList.find((item) => item.title === selectedTitle);

    if (chapter) {
      setSelectedChapter(chapter);
    }
  };
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await updateText(selectedChapter.id, text, selectedChapter.title);
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await getText(selectedChapter.id);

      setText(data.text);
    };

    load();
  }, [selectedChapter]);
  return (
    <>
      <form
        className="flex flex-col items-center gap-3 h-5/6"
        onSubmit={submitForm}
        id="form"
      >
        <select onChange={handleChapterChange} value={selectedChapter.title}>
          {chaptersList.map(({ id, title }) => (
            <option key={id}>{title}</option>
          ))}
        </select>

        {selectedChapter.id !== 0 && (
          <ReactQuill
            theme="snow"
            value={text}
            onChange={setText}
            className="h-2/3 w-4/6"
            modules={{
              clipboard: {
                matchVisual: false,
              },
            }}
          />
        )}
      </form>
      {selectedChapter.id !== 0 && (
        <button type="submit" form="form">
          Зберегти текст
        </button>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Зміни збережено"
      />
    </>
  );
};
