export interface Post {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: string[];
  publishDate: string;
  owner: {
    firstName: string;
    lastName: string;
    picture: string;
  };
}

export interface PostResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
}
