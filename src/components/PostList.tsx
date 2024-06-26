import React, { useCallback, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchPosts } from "../api";
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

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

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
          data.pages.map((page, pageIndex) =>
            page.data.map((post, postIndex) => {
              if (
                pageIndex === data.pages.length - 1 &&
                postIndex === page.data.length - 1
              ) {
                return (
                  <div
                    key={post.id}
                    ref={lastPostRef}
                    className="p-4 transition-transform duration-75 border rounded cursor hover:scale-105"
                  >
                    <h3 className="font-bold">
                      {post.owner.firstName} {post.owner.lastName}
                    </h3>
                    <img
                      src={post.image}
                      alt={post.text}
                      className="object-cover w-full h-64"
                    />
                    <p>{post.text}</p>
                    <p className="text-gray-500">Likes: {post.likes}</p>
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
                );
              } else {
                return (
                  <div
                    key={post.id}
                    className="p-4 transition-transform duration-75 border rounded cursor hover:scale-105"
                  >
                    <h3 className="font-bold">
                      {post.owner.firstName} {post.owner.lastName}
                    </h3>
                    <img
                      src={post.image}
                      alt={post.text}
                      className="object-cover w-full h-64"
                    />
                    <p>{post.text}</p>
                    <p className="text-gray-500">Likes: {post.likes}</p>
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
                );
              }
            })
          )}
      </div>
      <div className="mt-4 text-center">
        {isFetching ? <Spinner loadingText="Fetching...." /> : null}
      </div>
    </div>
  );
};

export default PostList;
