import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { fAQs } from "../../constants";

type Props = {};

export default function FAQs({}: Props) {
  return (
    <section>
      <h2 className="features-title mx-auto  mb-10 text-center text-4xl font-semibold">
        FAQ's
      </h2>
      <div className="mx-auto flex w-11/12 flex-col justify-center lg:w-8/12">
        <div className="">
          {fAQs.map((fa, key) => (
            <Collapsible key={key}>
              <CollapsibleTrigger className="w-full border border-[#2A2B3A]">
                <div className="flex flex-row ">
                  <div className="h-16 w-16 items-center border border-[#2A2B3A] p-6 text-center text-2xl font-semibold max-lg:my-auto lg:h-24 lg:w-24 lg:text-4xl">
                    {fa.n}
                  </div>
                  <h4 className=" mx-7 my-auto text-lg lg:text-2xl">{fa.q}</h4>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="m-6 rounded-3xl border border-[#2A2B3A] p-6">
                {fa.a}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
