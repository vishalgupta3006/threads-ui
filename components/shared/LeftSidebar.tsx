"use client";

import { ROUTES, sidebarLinks } from "@/constants";
import {
  SignOutButton,
  SignedIn,
  useAuth,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-col flex-1 w-full px-6 gap-6">
        {sidebarLinks.map(link => {
          const isActive =
            (pathName.includes(link.route) &&
              link.route.length > 1) ||
            pathName === link.route;

          const route =
            link.route === ROUTES.profile
              ? `${link.route}/${userId}`
              : link.route;
          return (
            <Link
              key={link.label}
              href={route}
              className={`leftsidebar_link ${
                isActive ? "bg-primary-500" : ""
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                height={28}
                width={28}
              />
              <p className="text-light-1 max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                height={24}
                width={24}
              />
              <p className="text-light-2 max-lg:hidden">
                Logout
              </p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
