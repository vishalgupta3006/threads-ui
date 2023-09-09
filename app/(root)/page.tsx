import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

const Home = async () => {
  const { threads, isNext } = await fetchThreads();
  const user = await currentUser();
  // console.log(threads, isNext);

  return (
    <>
      <h1 className="head-text text-left">home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {threads?.length > 0 ? (
          <>
            {threads.map(thread => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        ) : (
          <p className="no-result">No threads found</p>
        )}
      </section>
    </>
  );
};

export default Home;
