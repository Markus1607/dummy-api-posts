import React from "react";
import PostList from "./components/PostList";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100/50">
      <PostList />
    </div>
  );
};

export default App;
