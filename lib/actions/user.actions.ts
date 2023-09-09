"use server";

import { ROUTES } from "@/constants";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";
import { FilterQuery, SortOrder } from "mongoose";

type TParams = {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
};

type TFetchUsers = {
  userId: string;
  searchString: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
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

    await User.findOneAndUpdate(
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

    if (path === ROUTES.editprofile) {
      revalidatePath(path);
    }
  } catch (e: any) {
    throw new Error(
      `failed to create/update user: ${e.message}`,
    );
  }
};

export const fetchUser = async (id: string) => {
  try {
    await connectToDB();

    return await User.findOne({
      id,
    });
  } catch (e: any) {
    throw new Error(`Failed to fetch user: ${e.message}`);
  }
};

export const fetchUserThreads = async (id: string) => {
  try {
    await connectToDB();

    const threads = await User.findOne({
      id,
    }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          populate: "name image id",
        },
      },
    });

    return threads;
  } catch (e: any) {
    throw new Error(
      `Failed to fetch user threads: ${e.message}`,
    );
  }
};

export const fetchUsers = async ({
  userId,
  searchString,
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: TFetchUsers) => {
  try {
    await connectToDB();

    const skipUsers = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const userQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipUsers)
      .limit(pageSize);

    const totalUserCount = await User.countDocuments(query);

    const users = await userQuery.exec();

    const isNext = totalUserCount > skipUsers + pageSize;
    return {
      isNext,
      users,
    };
  } catch (e: any) {
    throw new Error(
      `Failed to fetch users by saerching "${searchString}": ${e.message}`,
    );
  }
};
