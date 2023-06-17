"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    // setFilteredPosts(
    //   posts.map((post) => {
    //     return (
    //       post.prompt.includes(searchText) ||
    //       post.tag.includes(searchText) ||
    //       post.creator.username.includes(searchText)
    //     );
    //   })
    // );
  };
  const [posts, setPosts] = useState([]);

  const filteredPosts = () => {
    const filtered = posts.filter((post) => {
      return (
        post.prompt.includes(searchText) ||
        post.tag.includes(searchText) ||
        post.creator.username.includes(searchText)
      );
    });

    return filtered;
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      console.log(data);

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="search"
          placeholder="Search for a tag, prompt or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts()} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
