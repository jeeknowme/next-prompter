"use client";

import Profile from "@components/Profile";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params]);

  return (
    <Profile
      name={username}
      desc={`Welcome to  ${username}'s page`}
      data={posts}
    />
  );
};

export default Page;
