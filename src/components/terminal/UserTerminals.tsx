import React from "react";
import Terminal from "./Terminal";
import { fetchLatestActiveOp } from "@/server/actions/ops";

type Props = { profiles: any[] };

export default function UserTerminals({ profiles }: Props) {
  return (
    <div className="mt-16">
      {profiles.map(async (profile) => {
        const op = await fetchLatestActiveOp(profile._id.toString());
        let showProgressBar = false;

        if (op?.progress || op?.status === "PENDING") showProgressBar = true;
        return (
          <Terminal
            pfp={profile.profilePicture}
            name={profile.name}
            profileId={profile._id.toString()}
            key={profile._id.toString()}
            showProgressBar={showProgressBar}
            progress={op?.progress}
          />
        );
      })}
    </div>
  );
}
