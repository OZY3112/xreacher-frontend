"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = { profileId: string; stats: any };

export default async function AnalyticsChart({ profileId, stats }: Props) {
  const router = useRouter();

  // const data = [
  //   {
  //     value: 12,
  //     value2: 10,
  //     date: "2022-01-01",
  //   },
  //   {
  //     value: 2,
  //     value2: 3,
  //     date: "2022-01-02",
  //   },
  //   {
  //     usersDMedNum: 7,
  //     usersRespondedNum: 1,
  //     date: "2022-01-03",
  //   },
  // ];

  const data = stats.map((stats: any) => {
    return {
      value: 12,
      value2: 10,
      date: stats.date,
    };
  });

  console.log(data)
  console.log(stats)

  const handleSelectChange = (value: string) => {
    router.push(`/analytics/${profileId}/${value}`);
  };
  return (
    <div className="mx-auto mt-12 w-full  rounded-3xl bg-card">
      {/* Header  */}

      <div className="flex w-10 w-full justify-between p-5">
        <h1 className="text-2xl  text-white">Analytics</h1>
        <div className="">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger
              defaultValue={"weekly"}
              className="w-[180px] !bg-card !text-white "
            >
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent className="!bg-card !text-white ">
              <SelectItem value="weekly">Last 7 days</SelectItem>
              <SelectItem value="monthly">Last month</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="allTime">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Actual Chart */}
      <div className="flex justify-center pb-5 pt-16">
        {data ? (
          <ResponsiveContainer width="80%" minHeight={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="date"
                //  stroke="#eee"
              />
              <YAxis
                tickFormatter={(tick: any) => tick}
                dataKey="value"
                // stroke="#eee"
              />

              <Tooltip formatter={(value: any) => value} />
              <Line
                dot={true}
                dataKey="value"
                type="monotone"
                name="Total dms sent"
                stroke="#82ca9d"
              />
              <Line
                dot={true}
                dataKey="value2"
                type="monotone"
                name="Total responses"
                stroke="#e0e0e0"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <h1 className="text-2xl  text-white">No data</h1>
        )}
      </div>
    </div>
  );
}
