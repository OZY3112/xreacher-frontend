import Image from "next/image";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="mx-auto flex h-[80px] w-full max-w-screen-2xl  items-center justify-around lg:flex">
      <div className="lg:fl flex flex-col items-center justify-center justify-around">
        <p className="mx-auto w-full text-center text-sm text-gray-600">
          © 2024 Xreacher. All rights reserved.
        </p>
        <ul className=" flex gap-5 text-gray-600">
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Cookies</li>
        </ul>
      </div>
    </div>
  );
}
