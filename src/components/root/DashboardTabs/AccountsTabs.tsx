"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Image from "next/image";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

type Props = {
  profiles: [
    { _id: string; status: string; name: string; profilePicture: string },
  ];
};
export default function AccountsTabs({ profiles }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-800"; // Adjust the green shade as needed
      case "RUNNING":
        return "bg-blue-800"; // Adjust the blue shade as needed
      case "ERRORED":
        return "bg-red-800"; // Adjust the red shade as needed
      default:
        return "bg-gray-500"; // Fallback color
    }
  };

  return (
    <Table className="mx-auto mb-20 w-11/12">
      <TableHeader className="!bg-[#111337]">
        <TableRow>
          <TableHead className="w-[100px]">Account</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Reply rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {profiles?.map((profile) => (
          <TableRow className=" w-full border-b border-gray-700 ">
            <TableCell className=" w-48 font-semibold text-white ">
              <Link
                href={`/analytics/${profile?._id}/weekly`}
                className="flex gap-3"
              >
                <Image
                  src={profile.profilePicture}
                  width={25}
                  height={25}
                  alt="profile"
                  className="rounded-full"
                />
                {profile.name}
              </Link>
            </TableCell>
            <TableCell className="">
              <Badge
                className={`${getStatusColor(profile.status)} font-semibold text-white`}
              >
                {profile.status}
              </Badge>
            </TableCell>
            <TableCell className="ml-72 flex text-white">100%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
