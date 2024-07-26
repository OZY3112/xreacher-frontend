import { cardData } from "@/constants";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {};

export default function PlatformFeatures({}: Props) {
  return (
    <section className="my-28" id="Features">
      <div className="mx-auto w-11/12 lg:w-9/12 ">
        <div className="w-screen lg:w-[600px]">
          <h2 className="features-title text-3xl font-semibold lg:text-4xl">
            New Platform Features
          </h2>
          <p className="mt-4 text-gray-500">
            Tired of finding right prospects to DM and sending them messages,
            Xreacher takes both things and does them for you, check out the
            features:
          </p>
        </div>
      </div>
      <div className="  mt-14 flex min-w-full gap-10 overflow-x-scroll">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {cardData.map((card) => (
              <CarouselItem
                key={card.title}
                className="features_card mx-5 min-h-[350px] min-w-[400px] basis-1/5 p-5 py-6"
              >
                <Image
                  src={card.icon}
                  width={70}
                  height={70}
                  alt="play btn arrow"
                  className="mx-auto mb-3 mt-7"
                />
                <h3 className="features-title mx-auto mb-4 text-center text-2xl font-semibold">
                  {card.title}
                </h3>
                <p className="text-center text-gray-400">{card.description}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
