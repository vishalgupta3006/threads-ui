"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";


type TThread = {
  text: string, author: string, communityId: string | null, path: string
}
export const createThread = async ({
  text, author, communityId, path
}: TThread) => {
  try {
    await connectToDB();

    const createdThread = await Thread.create({
      text, author, community: null
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id }
    });

    revalidatePath(path);
  }
  catch (e: any) {
    throw new Error(`Failed to create the thread: ${e.message}`);
  }
}