import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { getSession } from "next-auth/client";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  const session = await getSession({ req });

  if (!session)
    return new Response("User not authenticated, please relog-in", {
      status: 401,
    });

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", {
      status: 500,
    });
  }
};
