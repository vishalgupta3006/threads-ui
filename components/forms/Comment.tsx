"use client";

import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { commentValidation } from "@/lib/validations/thread.validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

type TComment = {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
};

const Comment = ({
  threadId,
  currentUserImg,
  currentUserId,
}: TComment) => {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof commentValidation>,
  ) => {
    await addCommentToThread({
      commentText: values.thread,
      threadId,
      userId: JSON.parse(currentUserId),
      path: pathname,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="comment-form"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex gap-3 w-full items-center">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile Image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="comments..."
                  className="no-focus text-light-1"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
