import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

type Props = { nextStep: any; setTitle: any; title: string };

export default function NameCampaign({ nextStep, setTitle, title }: Props) {
  return (
    <div className="mx-auto my-auto flex h-screen w-full content-center items-center justify-center bg-[#12132D]">
      <div>
        <h2 className=" text-2xl font-semibold text-white">
          {"Let’s create a new campaign"}
        </h2>
        <p className=" text-[#7A797D] ">What would you like to name it?</p>

        <div className="mt-4">
          <Label htmlFor="Campaign" className="text-white">
            Campaign Name
          </Label>
          <Input
            type="text"
            id="text"
            placeholder="Campaign #1"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>

        <div className="mt-4 ">
          <Button variant={"ghost"} className="mr-6 text-gray-600">
            Cancel
          </Button>

          <Button
            className="!bg-[#6C48F7]"
            onClick={nextStep}
            disabled={!title}
          >
            Continue
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
