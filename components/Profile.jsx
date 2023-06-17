import Loading from "@app/profile/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") router.push("/");
  // }, [status]);

  if (status === "loading") {
    // Loading state while session is being checked
    return <Loading />;
  }

  if (status === "unauthenticated" && data.length === 0)
    return <h2>Please login first</h2>;

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
