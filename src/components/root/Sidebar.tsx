"use client";

import React from "react";
import { appNavLinks } from "@/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
type Props = {};

export default function Sidebar({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    // flex box set up
    <aside className="h-screen w-1/12 rounded-r-lg bg-pri">
      <div className="mx-auto mt-6 h-screen w-10/12">
        {/* X reacher logo */}
        <div className=" mx-auto flex w-full justify-center">
          <Image src="/root/logo.png" width={50} height={50} alt="logo" />
        </div>

        {/* Dynamic links set up */}
        <TooltipProvider>
          <ul className=" mx-auto mt-16 flex w-full flex-col justify-center">
            {appNavLinks.map((link) => {
              const isActive =
                (pathname.includes(link.path) && link.path.length > 1) ||
                pathname === link.path;
              return (
                <li
                  className={` mx-auto mb-4 ${isActive && "mx-auto flex w-full justify-center rounded-lg bg-sidebar_link_active p-2 py-3"}`}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={link.path}>
                        <Image
                          src={link.icon}
                          width={35}
                          height={35}
                          alt="logo"
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </TooltipProvider>

        <div className="mx-auto mt-44 flex justify-center">
          <UserButton />
        </div>
      </div>
    </aside>
  );
}
