"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";

type TThread = {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
};
export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: TThread) => {
  try {
    await connectToDB();

    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (e: any) {
    throw new Error(
      `Failed to create the thread: ${e.message}`,
    );
  }
};

export const fetchThreads = async (
  pageNumber = 1,
  pageSize = 20,
) => {
  try {
    await connectToDB();
    const skipThreads = (pageNumber - 1) * pageSize;
    const query = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipThreads)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totatThreads = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const threads = await query.exec();
    const isNext = totatThreads > skipThreads + pageSize;

    return {
      threads,
      isNext,
    };
  } catch (e: any) {
    throw new Error(`Failed to fetch threds: ${e.message}`);
  }
};

export const fetchThreadById = async (id: string) => {
  try {
    await connectToDB();

    const thread = Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id name parentId image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (e: any) {
    throw new Error(
      `Failed to fetch thread details of ${id}: ${e.message}`,
    );
  }
};

type TComment = {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
};
export const addCommentToThread = async ({
  threadId,
  commentText,
  userId,
  path,
}: TComment) => {
  try {
    await connectToDB();

    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    const commentThread = new Thread({
      text: commentText,
      parent: threadId,
      author: userId,
    });

    const savedCommentThread = await commentThread.save();

    originalThread.children.push(savedCommentThread._id);
    originalThread.save();

    revalidatePath(path);
  } catch (e: any) {
    throw new Error(
      `Failed to add comment on thread ${threadId}: ${e.message}`,
    );
  }
};
