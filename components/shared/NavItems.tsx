"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
   const pathname = usePathname();

   return (
      <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
         {headerLinks.map(({ route, label }) => {
            const isActive = pathname === route;

            return (
               <li key={route} className={`${isActive && "text-primary-500"} flex-center p-medium whitespace-nowrap`}>
                  <Link href={route}>{label}</Link>
               </li>
            );
         })}
      </ul>
   );
};

export default NavItems;
