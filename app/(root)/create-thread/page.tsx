import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

const Page = async () => {
    const user = await currentUser();
    console.log("User inside create-thread", user);

    if (!user) return null;

    const userDetails = await fetchUser(user.id);

    if (!userDetails.onboarded) redirect("onboarding");

    console.log("User Details", userDetails)

    return (<>
        <h1 className="head-text">Create Thread</h1>
        <PostThread userId={userDetails.id} />
    </>
    )
}

export default Page;