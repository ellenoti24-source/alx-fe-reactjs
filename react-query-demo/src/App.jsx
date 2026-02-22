// QueryClient QueryClientProvider queryClient client={queryClient} PostsComponent

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import PostsComponent from "./components/PostsComponent";

function App() {
  const queryClient = new QueryClient();

  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query Demo</h1>

        <button onClick={() => setShowPosts(!showPosts)}>
          {showPosts ? "Hide Posts" : "Show Posts"}
        </button>

        {showPosts && <PostsComponent />}
      </div>
    </QueryClientProvider>
  );
}

export default App;+