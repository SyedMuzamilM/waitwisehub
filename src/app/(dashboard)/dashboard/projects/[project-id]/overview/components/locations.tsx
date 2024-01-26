"use client";

import { url } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";
import BarList from "./bar-list";
import { COUNTRIES } from "@/lib/constants/countries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabSelect } from "@/components/tab-select";

export default function Locations() {
  const [tab, setTab] = useState<"country" | "city">("country");

  const { data } = useSWR<{ country: string; city: string; submissions: number }[]>(
    `${url}/api/projects/bk/stats/${tab}?interval=30d`,
    fetcher
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Locations
          <TabSelect
            options={["country", "city"]}
            selected={tab}
            selectAction={(option) => setTab(option as "country" | "city")}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BarList
          data={
            data?.map((d) => ({
              icon: (
                <img
                  alt={d.country}
                  src={`https://flag.vercel.app/m/${d.country}.svg`}
                  className="h-3 w-4"
                />
              ),
              submissions: d.submissions,
              title: tab === "country" ? COUNTRIES[d.country] : d.city,
            })) || []
          }
          tab={tab}
          barBackground="bg-orange-100"
          maxSubmissions={data?.[0]?.submissions || 0}
        />
      </CardContent>
    </Card>
  );
}
