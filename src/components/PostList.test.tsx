import React from "react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, test, beforeAll, afterEach, afterAll } from "vitest";
import PostList from "./PostList";
import { API_URL } from "../api";

const handlers = [
  http.get(`${API_URL}/post`, () => {
    return HttpResponse.json({
      data: [
        {
          id: "1",
          text: "Post 1",
          image: "https://via.placeholder.com/150",
          likes: 10,
          tags: ["tag1", "tag2"],
          publishDate: "2023-01-01",
          owner: {
            firstName: "John",
            lastName: "Doe",
            picture: "https://via.placeholder.com/50",
          },
        },
      ],
      total: 1,
      page: 0,
      limit: 10,
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

test("renders PostList and fetches posts", async () => {
  renderWithClient(<PostList />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  expect(screen.getByText("Post 1")).toBeInTheDocument();
});
