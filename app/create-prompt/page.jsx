"use client";

import Loading from "@app/profile/loading";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const { status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") router.push("/");
  // }, [status]);

  if (status === "loading") {
    // Loading state while session is being checked
    return <Loading />;
  }

  if (status === "unauthenticated") return <h2>Please login first</h2>;

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.status === 401) {
        router.push("/");
        signOut();
      }

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
