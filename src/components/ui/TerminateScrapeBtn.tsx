"use client";

import { terminateScrape } from "@/server/actions/ops";
import React from "react";
import { Button } from "./button";

type Props = { id: string };

export default function TerminateScrapeBtn({ id }: Props) {
  return (
    <Button variant="destructive" onClick={() => terminateScrape(id)}>
      terminate
    </Button>
  );
}
