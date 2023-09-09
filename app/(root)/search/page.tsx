import UserCard from "@/components/cards/UserCard";
import { ROUTES } from "@/constants";
import {
  fetchUser,
  fetchUsers,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect(ROUTES.onboarding);

  const { isNext, users } = await fetchUsers({
    userId: user.id,
    searchString: "",
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {users.length ? (
          <>
            {users.map((user: any) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imageUrl={user.image}
                personType="User"
              />
            ))}
          </>
        ) : (
          <p className="no-result"> No users</p>
        )}
      </div>
    </section>
  );
};

export default Page;
