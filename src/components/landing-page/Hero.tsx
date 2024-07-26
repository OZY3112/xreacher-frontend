import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import Script from "next/script";
import React from "react";

type Props = {};

export default async function Hero({}: Props) {
  // const currUser = await currentUser();
  // if (currUser) return redirect("/pricing");

  return (
    <section className="w-12/12 mx-auto overflow-y-hidden  pb-32 lg:w-10/12">
      <div className="lg:hero-bg flex w-full flex-col items-center justify-center rounded-3xl">
        <p className="welcome_text mb-4  mt-16 flex gap-2 uppercase">
          <Image
            src="/assets/sparkles.svg"
            height={16}
            width={16}
            alt="sparkles"
          />
          <span>Welcome to Xreacher</span>
        </p>
        <h1 className="hero_h1 mb-4 w-11/12 text-6xl max-lg:text-2xl lg:w-8/12">
          Send
          <span className="hero_h1_purple text-center"> 100s of DMS</span>
          /day to your targeted prospects on autopilot
        </h1>
        <p className="hero_description w-10/12 lg:w-6/12">
          XReacher automates the draining process of finding right prospects,
          sending DMs and fills your inbox with replies from your desired
          prospects
        </p>

        <div className="mt-24 mt-4 gap-3 max-lg:space-y-3 lg:-mb-16 lg:flex ">
          <div className=" mt-4  max-lg:mx-auto max-lg:mx-auto max-lg:w-11/12  max-lg:w-11/12">
            <div className="relative aspect-video w-[853px] rounded-md">
              <iframe
                className=" inset-0 h-full w-full"
                src="https://www.youtube.com/embed/DIOw6m3wu00"
                title="How can you send 500 DMs/day"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
