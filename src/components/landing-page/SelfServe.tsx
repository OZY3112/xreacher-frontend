import Image from "next/image";
import React from "react";

type Props = {};

export default function SelfServe({}: Props) {
  return (
    <section className="mx-auto w-full lg:w-9/12">
      <div className="self-serve-border px-8 py-10 lg:flex lg:px-16">
        <div>
          <h2 className="self-serve-title text-2xl font-bold lg:text-5xl">
            It takes less than 5 minutes to set-up, just follow this 3 step
            procces:
          </h2>
          <p className="mb-2 mt-5 text-gray-500">
            Scrape thousands of leads from Twitter in seconds
          </p>

          <div className="space-y-4">
            <h2 className="self-serve-title text-2xl lg:text-3xl">
              1. Find account that are following your targeted prospects{" "}
            </h2>
            <h2 className="self-serve-title text-2xl lg:text-3xl">
              2. Put the filters you want (fliter by bio, blue checkmark,
              country, number of followers, etc..){" "}
            </h2>
            <h2 className="self-serve-title text-2xl lg:text-3xl">
              3. Start sending DMs to those people{" "}
            </h2>
          </div>

          <div className="mt-16">
            <a href="https://twitter.com/DaHampl" target="_blank" rel="noopener noreferrer" className="uppercase">
              David Hampl
            </a>
            <p className="">Founder and CEO of Twitter AI Tool</p>
          </div>
        </div>
        <div className="">
          <Image
            src="/assets/self-serve.svg"
            width={550}
            height={550}
            alt="play btn arrow"
            className="my-auto"
          />
        </div>
      </div>
    </section>
  );
}
