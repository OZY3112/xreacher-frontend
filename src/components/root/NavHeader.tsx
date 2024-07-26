import React from "react";
import { Separator } from "../ui/separator";

type Props = { title: string };

export default function NavHeader({ title }: Props) {
  return (
    <header>
      <h2 className="text-3xl font-semibold text-white">{title}</h2>

      <Separator className="mt-6 !bg-slate-500" />
    </header>
  );
}
