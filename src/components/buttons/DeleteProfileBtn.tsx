"use client";

import { deleteProfile } from "@/server/actions/user";
import Image from "next/image";
import React from "react";

type Props = { id: string };

export default function DeleteProfileBtn({ id }: Props) {
  return (
    <div
      className="mr-12 flex flex-grow cursor-pointer justify-end"
      onClick={() => deleteProfile(id)}
    >
      <Image src="/assets/trashbin.svg" width={25} height={25} alt="trashbin" />
    </div>
  );
}
