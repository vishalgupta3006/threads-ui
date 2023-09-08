import { UserButton } from "@clerk/nextjs";

const Home = async () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h1 className="head-text text-left">home</h1>
    </div>
  )
}

export default Home;