"use client";

import React from "react";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
  title: string;
  setStatusFilter: any;
  setOrderFilter: any;
};

export default function CampaignsNavHeader({
  title,
  setStatusFilter,
  setOrderFilter,
}: Props) {
  return (
    <header>
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold text-white">{title}</h2>

        <FilterSelectors
          setStatusFilter={setStatusFilter}
          setOrderFilter={setOrderFilter}
        />
      </div>

      <Separator className="mt-6 !bg-slate-500" />
    </header>
  );
}

type FilterSelectorsProps = {
  setStatusFilter: (status: string) => void;

  setOrderFilter: (status: string) => void;
};
function FilterSelectors({
  setStatusFilter,
  setOrderFilter,
}: FilterSelectorsProps) {
  return (
    <div className="flex gap-6">
      <Select defaultValue="all" onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px] !bg-card !text-white ">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent className="!bg-card !text-white ">
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="terminated">Terminated</SelectItem>
          <SelectItem value="complete">Complete</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="newest" onValueChange={setOrderFilter}>
        <SelectTrigger className="w-[180px] !bg-card !text-white ">
          <SelectValue placeholder="Latest" />
        </SelectTrigger>
        <SelectContent className="!bg-card !text-white ">
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>

      <Button
        className="gap-2 !bg-[#6C48F7]"
        variant="destructive"
        onClick={() => (window.location.href = "/campaigns/choose")}
      >
        <Plus className="my-auto" />
        Start New
      </Button>
    </div>
  );
}
