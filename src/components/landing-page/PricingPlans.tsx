import React from "react";
import { priceCards } from "../../constants";
import Pro from "./pricecards/Pro";
import Basic from "./pricecards/Basic";
import Premium from "./pricecards/Premium";

type Props = {};

export default function PricingPlans({}: Props) {
  const { basic, premium, professional } = priceCards;
  return (
    <section
      className="mx-auto mb-16 w-11/12 text-white lg:w-9/12"
      id="Pricing"
    >
      <div className=" mx-auto w-screen lg:w-[800px]  ">
        <h2 className="features-title mx-auto text-center text-3xl font-semibold lg:text-4xl">
          Our Flexible Pricing plans
        </h2>
        <p className="mt-4 text-center text-gray-500">
          Pick a plan based on your needs
        </p>
      </div>
      <div className=" mx-auto mt-16 justify-center pt-12 lg:flex">
        <Basic basic={basic} />
        <Pro professional={professional} />
        <Premium premium={premium} />
      </div>
    </section>
  );
}
