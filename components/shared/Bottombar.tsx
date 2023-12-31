"use client";

import { ROUTES, sidebarLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Bottombar = () => {
  const pathName = usePathname();
  const { userId } = useAuth();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
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
              className={`bottombar_link ${
                isActive ? "bg-primary-500" : ""
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                height={28}
                width={28}
              />
              <p className="textsubtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
