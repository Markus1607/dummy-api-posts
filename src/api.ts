import axios from "axios";
import { PostResponse } from "./types";

export const API_URL = "https://dummyapi.io/data/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "app-id": import.meta.env.VITE_DUMMY_API_KEY,
  },
});

export const fetchPosts = async ({
  pageParam = 0,
}): Promise<{
  data: PostResponse["data"];
  nextPage?: number;
}> => {
  const response = await api.get("/post", {
    params: { page: pageParam, limit: 10 },
  });
  return {
    data: response.data.data,
    nextPage: response.data.data.length ? pageParam + 1 : undefined,
  };
};
