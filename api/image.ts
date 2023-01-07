import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const key = process.env.NEXT_PUBLIC_APIKEY;

export const GetHomeImage = async (page: number) => {
  const homeUrl = `${baseUrl}/movie/popular?api_key=${key}&page=${page}`;
  const res = await axios.get<ResponseData>(homeUrl);
  return res.data;
};

export const GetDetailImage = async (id: number | string) => {
  const item = await axios.get<ImageData>(`${baseUrl}/movie/${id}?api_key=${key}`);
  return item.data;
};
export const SearchItem = async (q: string | undefined,page:number) => {
  const urlfix = `${baseUrl}/search/movie?api_key=${key}&query=${q}&page=${page}`
  const search = await axios.get<ResponseData>(urlfix);
  return search.data;
};