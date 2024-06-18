import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchPosts } from "../api";
import { Post } from "../types";
import Spinner from "./spinner";

const PostList: React.FC = () => {
  const {
    data,
    status,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    return (
      <section className="flex flex-col items-center justify-center">
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/sf-regular/48/error.png"
          alt="error"
        />
        <p className="text-sm">Error fetching data</p>
      </section>
    );
  }

  return (
    <div className="p-4">
      <h1 className="p-2 text-lg font-bold text-center xl:text-2xl text-black/70">
        Dummyapi.io
      </h1>
      <div className="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-2 lg:gap-6 2xl:grid-cols-3">
        {data &&
          data.pages.map((page) =>
            page.data.map((post: Post) => (
              <div
                key={post.id}
                className="flex flex-col gap-1.5 p-4 border rounded-md shadow bg-white hover:scale-105 transition-transform duration-75"
              >
                <h3 className="font-bold lg:text-lg">
                  {post.owner.firstName} {post.owner.lastName}
                </h3>
                <img
                  src={post.image}
                  alt={post.text}
                  className="object-cover w-full h-64 rounded-sm"
                />
                <p className="text-sm text-gray-700 lg:text-base">
                  {post.text}
                </p>
                <p className="text-gray-500">
                  Likes:{" "}
                  <span className="font-medium text-blue-400">
                    {post.likes}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="px-4 py-2 text-white bg-blue-600 rounded cursor:pointer hover:scale-105"
        >
          {isFetchingNextPage ? (
            <div className="px-6 py-0.5 scale-75">
              <Spinner />
            </div>
          ) : hasNextPage ? (
            "Load More"
          ) : (
            "No more posts"
          )}
        </button>
      </div>
      <div className="mt-4 text-center">
        {isFetching && !isFetchingNextPage ? "Fetching..." : null}
      </div>
    </div>
  );
};

export default PostList;
