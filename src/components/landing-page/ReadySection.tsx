import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";

type Props = {};

export default function ReadySection({}: Props) {
  return (
    <section className="features-title mx-auto mb-16 mt-32 w-11/12 lg:w-7/12">
      <div className="ready-bg m-auto flex h-[400px] flex-col items-center justify-center rounded-b-3xl">
        <h2 className="w-11/12 text-center text-2xl font-bold lg:w-7/12 lg:text-4xl">
          Ready to level up your cold outreach?
        </h2>
        <p className="mt-5 w-11/12 text-sm lg:w-8/12 lg:text-base">
          Say bye to prospecting and looking for relevant leads all day,
          xreacher will find you all of the prospects in seconds and send all of
          the dms for you on autopilot
        </p>

        {/* <div className=" mt-10 flex gap-4">
          <form className=" flex gap-5 ">
            <div>
              <input
                type="email"
                placeholder="join the waiting list"
                className="border-b-1 h-8 rounded-xl bg-transparent  text-text focus:border-none focus:outline-none"
              />
              <div className="h-1 rounded-3xl bg-white"></div>
            </div>
            <button className="ready-btr">Enter the waitlist</button>
          </form>
        </div> */}
      </div>
    </section>
  );
}
