"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function ChooseCampaignTypePage({}: Props) {
  const buttonData = [
    {
      logo: "/tool/openSea.svg",
      text: "Open Sea Database",
      link: "/campaigns/open-sea",
    },
    {
      logo: "/tool/leads.svg",
      text: "leads",
      link: "/campaigns/add-new",
    },
  ];
  return (
    <div className="mx-auto my-auto flex h-screen w-full content-center items-center justify-center bg-[#12132D]">
      <ul>
        {buttonData.map((button) => {
          const router = useRouter();

          return (
            <li
              key={button.text}
              className="mb-6 flex items-center rounded-lg bg-[#6C48F7] p-2 px-8 hover:cursor-pointer"
              onClick={() => router.push(button.link)}
            >
              <Image
                src={button.logo}
                alt={button.text}
                height={42}
                width={42}
                className="mr-4 text-white"
              />
              <span className="text-xl font-bold">{button.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
