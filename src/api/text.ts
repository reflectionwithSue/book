import axios from "@/utils/axios.ts";


export const getText = async (chapterId: number) => {
  const response = await axios.get(`texts/${chapterId}.json`);

  return response.data;
};

export const updateText = async (chapterId:number, text: string, title: string) => {
  const data = JSON.stringify({text, title});

  const response = await axios.patch(`texts/${chapterId}.json`, data);

  return response.data;
}
