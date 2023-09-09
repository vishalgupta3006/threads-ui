import { ROUTES } from "@/constants";
import {
  fetchUser,
  getActivity,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect(ROUTES.onboarding);

  const activities = await getActivity(userInfo._id);

  console.log(activities)
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="flex flex-col mt-10 gap-5">
        {activities.length ? (
          <>
            {activities.map((activity: any) => (
              <Link
                key={activity._id}
                href={`${ROUTES.thread}/${activity.parentId}`}
              >
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    height={20}
                    width={20}
                    alt="Profile photo"
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">{activity.author.name}</span>
                    {" "}Replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="no-result">No Activity Yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
