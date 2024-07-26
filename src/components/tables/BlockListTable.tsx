import Image from "next/image";
import { Badge } from "../ui/badge";

type Props = {};

export default function BlockListTable({}: Props) {
  return (
    <div className="m-30 mx-auto mb-20 mt-12 w-11/12 w-full rounded-3xl bg-card px-8 py-5">
      {new Array(5).fill(0).map(() => (
        <div className="flex flex-row border-b border-gray-700 py-5">
          <div className="ml-12 mr-12 w-48 text-base text-white">
            John doe
          </div>

          <div className="mr-12 flex flex-grow justify-end">
            <Image
              src="/assets/trashbin.svg"
              width={25}
              height={25}
              alt="trashbin"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
