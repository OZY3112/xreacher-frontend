"use client";

import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-[28px] lg:px-[100px]">
      <div className="max-lg:w-[200px]">
        <Image src="/logo.svg" height={61} width={61} alt="logo" />
      </div>
      <ul className="flex gap-4 max-lg:hidden">
        {navLinks.map((link) => (
          <li key={link} className="">
            <Link href={`#${link}`} className="text-base text-text">
              {link}
            </Link>
          </li>
        ))}
      </ul>

      <div className=" space-x-4 text-white max-lg:hidden">
        <button
          className="sign-in-btn btn"
          onClick={() => router.push("/pricing")}
        >
          Sign in
        </button>
        <button
          className="sign-up-btn btn"
          onClick={() => router.push("/pricing")}
        >
          Sign up
        </button>
      </div>
      <div className="flex lg:hidden">
        <Image src="/assets/burger.svg" height={40} width={40} alt="logo " />
      </div>
    </header>
  );
}
