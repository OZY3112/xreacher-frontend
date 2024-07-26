import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import TerminateScrapeBtn from "../ui/TerminateScrapeBtn";

type Props = {
  orderFilter: string;
  statusFilter: string;
  parsedOps: any;
};

export default function CampaignsPageTable({
  orderFilter,
  statusFilter,
  parsedOps,
}: Props) {
  // const ops = parsedOps;

  const filteredOps = parsedOps.filter((op: any) => {
    return (
      statusFilter === "all" ||
      op.status.toUpperCase() === statusFilter.toUpperCase()
    );
  });

  // Sort operations based on orderFilter
  // Assuming there's a 'createdAt' field for sorting. Adjust as necessary.
  const sortedAndFilteredOps = filteredOps.sort((a: any, b: any) => {
    if (orderFilter === "newest") {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    } else {
      // "oldest"
      return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt));
    }
  });

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
  return (
    <Table className="mx-auto my-10 w-11/12">
      <TableHeader className="!bg-[#111337]">
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Sent</TableHead>
          <TableHead>Replied</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead className="">Reply rate</TableHead>
          <TableHead className="text-left">Terminate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {sortedAndFilteredOps?.reverse().map((op: any) => {
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
              <TableCell className=" text-white">{op?.usersResponded}</TableCell>
              <TableCell className=" text-white">{op?.progress}</TableCell>
              <TableCell className=" text-white">{`${replyRate}%`}</TableCell>
              <TableCell className=" text-white">
                {op.status === "PENDING" && <TerminateScrapeBtn id={op._id} />}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
