import { ROUTES } from "@/constants";
import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

type TThreadsTab = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
}: TThreadsTab) => {
  let response = await fetchUserThreads(accountId);

  if (!response) {
    redirect(ROUTES.home);
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {response.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
