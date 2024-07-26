"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Progress } from "../ui/progress";

type Props = {
  profileId: string;
  pfp: string;
  name: string;
  showProgressBar: boolean;
  progress: number;
};
export default function Terminal({
  profileId,
  pfp,
  name,
  showProgressBar,
  progress,
}: Props) {
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLiveUpdates() {
      const options: any = { method: "GET", headers: { accept: "*/*" } }; // try {
      const response = await axios.get(
        `/api/live_updates/${profileId}`,
        options
      );
      console.log(response.data.live_updates);
      setLiveUpdates(response.data.live_updates);
      // } catch (err: any) {
      //   setError(err);
      // }
    }

    fetchLiveUpdates();
    const intervalId = setInterval(fetchLiveUpdates, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [profileId]);

  return (
    <div className="mx-auto mb-16 w-[95%] rounded-2xl bg-card py-3">
      {/* Account tag */}
      <div className=" -mt-8 flex w-fit gap-4 rounded-2xl bg-[#3E3F63] p-2 px-6">
        <Image
          src={pfp}
          alt="profile pfp"
          height={40}
          width={40}
          className="h-10 w-10 rounded-full"
        />
        {/* TODO: account status tag */}

        <span className="mt-auto text-xl text-white ">{name}</span>
      </div>
      {/* notifications section */}
      <ScrollArea className="mx-auto my-6 h-[300px] w-11/12 rounded-md  p-4">
        {liveUpdates.map(
          (update: {
            createdAt: string;
            message: string;
            messageType: string;
          }) => {
            const getBgColor = (messageType: string): string => {
              switch (messageType) {
                case "dm_sent":
                  return "bg-[#0404188C]";
                case "sleep":
                  return "bg-[#464650]";
                case "error":
                  return "bg-[#3B3B5B]";
                default:
                  return "";
              }
            };

            return (
              <div
                className={`mx-auto mb-3 flex w-full gap-5 rounded-2xl ${getBgColor(update.messageType)} p-5 text-white`}
              >
                <span className="my-auto">
                  {formatDate({ isoDateString: update.createdAt })}
                </span>
                <div className="h-12 w-[1px] rounded-2xl border border-2 border-white"></div>
                <span className="my-auto">{update.message}</span>
              </div>
            );
          }
        )}
      </ScrollArea>

      {showProgressBar && (
        <div className="mx-auto w-8/12 ">
          <Progress value={progress} />
        </div>
      )}
    </div>
  );
}
