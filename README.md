# React DummyAPI Posts

This project is a React application that demonstrates how to progressively load data from a DummyAPI. It uses Vite, TypeScript, Tailwind CSS, and TanStack Query (React Query) for fetching data from the DummyAPI. The application initially loads 10 posts, user can use the load more button to load more posts.

Check out the live demo site [here](https://markus1607.github.io/dummy-api-posts/).

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher)
- pnpm (v9 or higher) for managing the dependencies - Check the [pnpm docs](https://pnpm.io/installation) for more information.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Markus1607/dummy-api-posts.git
   cd react-dummyapi-api-posts
   ```

2. Install the dependencies:

   ```sh
   pnpm install
   ```

3. Create a `.env` file in the root directory and add your DummyAPI App ID:

   ```env
   VITE_DUMMY_API_KEY=your_dummyapi_app_id
   ```

### Usage

To run the development server, use:

```sh
pnpm run dev
```

This will start the application at `http://localhost:5173`. Open this URL in your browser to view the application.


### Testing

This project uses Vitest for testing. To run the tests, use:

```sh
pnpm run test
```

## Project Structure

```
├── public
│   └── dogs-favicon.png
├── src
│   ├── api.ts
│   ├── App.tsx
│   ├── components
│   │   └── PostList.tsx
│   |   └── PostList.test.tsx
│   |   ├── spinner.tsx
│   ├── main.tsx
│   ├── setupTests.ts
│   ├── types.ts
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

### Explanation

- `src/api.ts`: Contains the API service to fetch posts from DummyAPI.
- `src/App.tsx`: Main application component.
- `src/components/PostList.tsx`: Component to display the list of posts with a button to load more posts.
- `src/components/PostList.test.tsx`: Unit tests for the `PostList` component.
- `src/main.tsx`: Entry point for the React application.
- `src/setupTests.ts`: Configuration for setting up testing libraries.
- `src/types.ts`: Type definitions for the project.
- `src/index.css`: Global CSS file.

## Technologies Used

- [Vite](https://vitejs.dev/): Fast build tool for modern web projects.
- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
- [TanStack Query](https://tanstack.com/query/v4): Data-fetching library for React.
- [Axios](https://axios-http.com/): Promise-based HTTP client.
- [Vitest](https://vitest.dev/): Testing framework for JavaScript.