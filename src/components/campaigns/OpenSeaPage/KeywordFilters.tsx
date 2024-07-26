import React from "react";
import {
  MaxFollowerSelect,
  MinFollowerSelect,
  VerifiedSelect,
  MinFollowingSelect,
  MaxFollowingSelect,
  BioInput,
  LocationInput,
} from "../CampaignsTabs/FilterInputs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

type Props = {};

export default function KeywordFilters({
  setBioExclude,
  setBioInclude,
  bioExclude,
  bioInclude,
  // location
  locationExclude,
  setLocationExclude,
  locationInclude,
  setLocationInclude,
  // following
  following,
  setFollowing,
  // followers
  followers,
  setFollowers,

  //verfied
  setVerified,
}: any) {
  return (
    <div className="m-30 mx-auto mb-20 mt-12  w-full rounded-2xl bg-card px-8 py-5">
      <h3 className=" text-lg font-semibold text-white">Bio Keyword filter</h3>

      <Separator className="mx-auto mt-4 w-full bg-gray-600 " />

      <BioInput
        setBioExclude={setBioExclude}
        setBioInclude={setBioInclude}
        bioExclude={bioExclude}
        bioInclude={bioInclude}
      />

      <h3 className="mt-5 text-lg font-semibold text-white">Region</h3>

      <Separator className="mx-auto mt-4 w-full bg-gray-600 " />

      <LocationInput
        locationExclude={locationExclude}
        setLocationExclude={setLocationExclude}
        locationInclude={locationInclude}
        setLocationInclude={setLocationInclude}
      />

      <Separator className="mx-auto mt-6 w-full bg-gray-600 " />

      <div className="mt-5 flex gap-5">
        <div>
          <h3 className=" mb-4 text-lg font-semibold text-white">Followers</h3>
          <div className="flex  gap-6">
            <div>
              <Label className="text-white">Min</Label>
              <MinFollowerSelect
                following={followers}
                setFollowing={setFollowers}
              />
            </div>
            <div>
              <Label className="text-white">Max</Label>
              <MaxFollowerSelect
                following={followers}
                setFollowing={setFollowers}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className=" mb-4 text-lg font-semibold text-white">Following</h3>
          <div className="flex  gap-6">
            <div>
              <Label className="text-white">Min</Label>
              <MinFollowingSelect
                following={following}
                setFollowing={setFollowing}
              />
            </div>
            <div>
              <Label className="text-white">Max</Label>
              <MaxFollowingSelect
                following={following}
                setFollowing={setFollowing}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className=" mb-4 text-lg font-semibold text-white">Verified</h3>
          <div className="">
            <Label className="text-white">Verified Status</Label>
            <VerifiedSelect setVerified={setVerified} />
          </div>
        </div>
      </div>
    </div>
  );
}
