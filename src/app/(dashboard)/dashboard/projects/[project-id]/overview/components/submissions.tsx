"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import BarChart from "./bar-chart";
import useSWR from "swr";
import { url } from "@/lib/constants";
import { fetcher, nFormatter } from "@/lib/utils";
import { Icons } from "@/components/icons";

export default function Submissions() {
  const { data: totalSubmissions } = useSWR<number>(
    `${url}/api/projects/bk/clicks`,
    fetcher
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>
            <div className="flex-none">
          <div className="flex items-end space-x-1">
            {totalSubmissions || totalSubmissions === 0 ? (
                <h1 className="text-3xl font-bold sm:text-4xl">
                  {nFormatter(totalSubmissions)}
                </h1>
            ) : (
              <div className="h-10 w-12 animate-pulse rounded-md bg-gray-200" />
            )}
            <Icons.chart className="mb-1 h-6 w-6 text-gray-600" />
          </div>
          <p className="text-sm font-medium uppercase text-gray-600">
            Total Submissions
          </p>
        </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart />
      </CardContent>
    </Card>
  );
}
