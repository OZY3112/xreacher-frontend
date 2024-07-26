"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Basic({ basic }: any) {
  const router = useRouter();

  return (
    <div
      className="price-card-bg border-1 my-auto h-[550px] w-80 min-w-[350px] rounded-3xl
   border border-[#3A4B8E] max-lg:mx-auto lg:rounded-l-[24px] "
    >
      <div className="mx-auto -mt-12 flex h-24 w-24 content-center items-center rounded-full bg-[#223272] ">
        <Image
          src={basic.icon}
          width={50}
          height={50}
          alt="basic"
          className="m-auto object-cover object-fill "
        />
      </div>
      <div className="mx-auto mt-10 w-fit rounded-3xl border border-2 border-white p-2 px-6 font-bold">
        Core
      </div>
      <div className="mx-auto mt-8 text-center text-6xl font-extrabold">
        {basic.price}
      </div>
      <h3 className="mt-5 text-center text-2xl font-semibold">{basic.title}</h3>
      <div className="mx-auto mt-5 flex flex-col justify-center">
        <ul className="mx-auto space-y-4">
          {basic.features.map((feature: any, key: any) => (
            <li className=" flex space-x-2" key={key}>
              <Image
                src="/assets/checkmark.svg"
                width={30}
                height={30}
                alt="basic"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="mx-auto mb-7 mt-6 flex rounded-3xl bg-[#890695FA] p-4 px-8 text-sm"
        onClick={() => router.push("/pricing")}
      >
        Get Started
      </button>
    </div>
  );
}
