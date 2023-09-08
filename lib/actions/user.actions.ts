"use server";

import user from "../models/user.models";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

type TParams = {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
};

export const updateUser = async ({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: TParams): Promise<void> => {
  try {
    await connectToDB();

    await user.findOneAndUpdate(
      {
        id: userId,
      },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true },
    );


    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (e: any) {
    throw new Error(
      `failed to create/update user: ${e.message}`,
    );
  }
};
