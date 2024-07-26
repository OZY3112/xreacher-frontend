"use client";

import Image from "next/image";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  ops: [
    {
      _id: string;
      status: string;
      title: string;
      usersDMed: number;
      usersResponded: number;
    },
  ];
};

export default function CampaignsTab({ ops }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-800"; // Adjust the green shade as needed
      case "PENDING":
        return "bg-blue-800"; // Adjust the blue shade as needed
      case "ERRORED":
        return "bg-red-800"; // Adjust the red shade as needed
      case "TERMINATED":
        return "bg-red-800"; // Adjust the red shade as needed
      default:
        return "bg-gray-500"; // Fallback color
    }
  };
  // const columns = [
  //   {
  //     accessorKey: "title",
  //     header: "Account",
  //   },
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //   },
  //   {
  //     accessorKey: "sent",
  //     header: "sent",
  //   },
  //   {
  //     accessorKey: "progress",
  //     header: "progress",
  //   },
  //   {
  //     accessorKey: "replyRate",
  //     header: "Reply Rate",
  //   },
  // ];

  const data = ops;

  return (
    <Table className="mx-auto mb-20 w-11/12">
      <TableHeader className="!bg-[#111337]">
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Sent</TableHead>
          <TableHead>Replied</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead className="text-left">Reply rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {ops?.reverse().map((op) => {
          const replyRate = op.usersResponded
            ? ((op.usersResponded / op.usersDMed) * 100).toFixed(0)
            : "0";
          return (
            <TableRow className=" w-full border-b border-gray-700 ">
              <TableCell className=" w-48 font-semibold text-white ">
                {op?.title}
              </TableCell>

              <TableCell className="">
                <Badge
                  className={`${getStatusColor(op.status)} font-semibold text-white`}
                >
                  {op.status}
                </Badge>
              </TableCell>

              <TableCell className=" text-white">{op?.usersDMed}</TableCell>
              <TableCell className=" text-white">
                {op?.usersResponded}
              </TableCell>
              <TableCell className=" text-white">{op?.status}</TableCell>
              <TableCell className=" text-white">{`${replyRate}%`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      {/* <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-white">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table> */}
    </Table>
  );
  // return (
  // <div className="mx-auto flex flex-col items-center justify-center object-center ">
  //   <div className="mx-auto mt-24 w-44 text-center text-xl text-white">
  //     Create a campaign to get started...
  //   </div>
  //   <div>
  //     <Image
  //       src="/root/emptyCampaigns.svg"
  //       width={200}
  //       height={200}
  //       alt="Empty campaigns"
  //     />
  //   </div>
  //   <div className="bg-[#6C48F7] mb-24 p-2 text-white rounded-xl"> Create Campaign</div>
  // </div>
  // );
}
