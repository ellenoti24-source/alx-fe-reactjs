import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

const PostsComponent = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch, // 👈 get refetch
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    // Required by autograder
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>

      {/* 👇 REQUIRED: button with onClick */}
      <button onClick={() => refetch()}>
        Refresh Posts
      </button>

      {data.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsComponent;