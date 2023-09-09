import { ROUTES } from "@/constants";
import {
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Topbar = () => {
  return (
    <nav className="topbar">
      <Link
        href={ROUTES.home}
        className="flex items-center gap-4"
      >
        <Image
          src="./assets/logo.svg"
          alt="logo"
          height={28}
          width={28}
        />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          Threads
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  height={24}
                  width={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <UserButton />
      </div>
    </nav>
  );
};

export default Topbar;
