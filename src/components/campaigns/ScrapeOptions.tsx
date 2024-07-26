import React, { useState } from "react";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

type Props = {
  profilesToBeUsed: any;
  setProfilesToBeUsed: any;
  userProfiles: [
    {
      _id: string;
      status: string;
      profilePicture: string;
      name: string;
    },
  ];

  dmsPerDay: any;
  setDmsPerDay: any;
  skipPreviouslyContacted: any;
  setSkipPreviouslyContacted: any;
  crossAccountPrevent: any;
  setCrossAccountPrevent: any;
};
type AccountProps = {
  profilesToBeUsed: any;
  setProfilesToBeUsed: any;
  userProfiles: [
    {
      _id: string;
      status: string;
      profilePicture: string;
      name: string;
    },
  ];
};

export default function ScrapeOptions({
  userProfiles,
  profilesToBeUsed,
  setProfilesToBeUsed,
  dmsPerDay,
  setDmsPerDay,
  skipPreviouslyContacted,
  setSkipPreviouslyContacted,
  crossAccountPrevent,
  setCrossAccountPrevent,
}: Props) {
  // dmsPerDay = { dmsPerDay };
  // setDmsPerDay = { setDmsPerDay };
  // skipPreviouslyContacted = { skipPreviouslyContacted };
  // setSkipPreviouslyContacted = { setSkipPreviouslyContacted };
  // crossAccountPrevent = { crossAccountPrevent };
  // setCrossAccountPrevent = { setCrossAccountPrevent };

  return (
    <div className="m-30 mx-auto mb-20 mt-12  w-full rounded-2xl bg-card px-8 py-5">
      <AccountToUse
        userProfiles={userProfiles}
        profilesToBeUsed={profilesToBeUsed}
        setProfilesToBeUsed={setProfilesToBeUsed}
      />
      <Separator className="mt-6 !bg-slate-500" />
      <MessageLimit setDmsPerDay={setDmsPerDay} />
      <Separator className="mt-6 !bg-slate-500" />
      <PrevDms setSkipPreviouslyContacted={setSkipPreviouslyContacted} />
      <Separator className="mt-6 !bg-slate-500" />
      <PreventCrossAccount setCrossAccountPrevent={setCrossAccountPrevent} />
      <Separator className="mt-6 !bg-slate-500" />
    </div>
  );
}

function PreventCrossAccount({ setCrossAccountPrevent }: any) {
  return (
    <div className="mt-6 flex justify-between">
      <span className="my-auto font-semibold text-white">
        Prevent Cross Account Duplicates
      </span>

      <Switch onChange={setCrossAccountPrevent} />
    </div>
  );
}
function PrevDms({ setSkipPreviouslyContacted }: any) {
  return (
    <div className="mt-6 flex justify-between">
      <span className="my-auto font-semibold text-white">
        Skip Previously DMed
      </span>

      <Switch onChange={setSkipPreviouslyContacted} />
    </div>
  );
}

function MessageLimit({ setDmsPerDay }: any) {
  return (
    <div className="mt-6 flex justify-between">
      <span className="my-auto font-semibold text-white">
        Account Message Limit
      </span>

      <div className="flex gap-4">
        <Select defaultValue="250" onValueChange={setDmsPerDay}>
          <SelectTrigger className="w-[100px] rounded-none !bg-card !text-white">
            <SelectValue defaultValue="250" />
          </SelectTrigger>
          <SelectContent className="rounded-none !bg-card !text-white ">
            <SelectItem value="250">250</SelectItem>
            <SelectItem value="450">450</SelectItem>
          </SelectContent>
        </Select>

        <span className="my-auto text-white">/Day</span>
      </div>
    </div>
  );
}

function AccountToUse({
  userProfiles,
  profilesToBeUsed,
  setProfilesToBeUsed,
}: AccountProps) {
  const handleProfileSelect = (profileId: string) => {
    setProfilesToBeUsed([...profilesToBeUsed, profileId]);
  };

  const handleDeleteProfile = (profileToDelete: string) => {
    setProfilesToBeUsed(
      profilesToBeUsed.filter((profile: string) => profile !== profileToDelete)
    );
  };

  return (
    <div className="flex justify-between">
      <span className="my-auto font-semibold text-white">Account To Use</span>

      <div className="">
        <Select onValueChange={handleProfileSelect}>
          <SelectTrigger className="w-[300px] rounded-none !bg-card !text-white">
            <SelectValue placeholder="Select Accounts" />
          </SelectTrigger>
          <SelectContent className="rounded-none !bg-card !text-white ">
            {userProfiles.map((profile) => (
              <SelectItem
                disabled={profile.status === "PENDING"}
                value={profile._id}
              >
                {profile.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="mt-4 flex w-[300px] flex-wrap gap-4 ">
          {profilesToBeUsed.map((profileId: string) => {
            const profile = userProfiles.find((p) => p?._id == profileId);
            return (
              <Badge
                key={profileId}
                onClick={() => handleDeleteProfile(profileId)}
                className=" bg-gray-400 hover:cursor-pointer"
              >
                {profile ? profile.name : "Unknown Profile"}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
