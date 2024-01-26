"use client";

import { url } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";
import BarList from "./bar-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeviceIcon from "./device-icon";
import { DeviceTabs } from "@/lib/stats";
import { TabSelect } from "@/components/tab-select";

export default function Devices() {
  const [tab, setTab] = useState<DeviceTabs>("device");

  const { data } = useSWR<
    ({
      [key in DeviceTabs]: string;
    } & { submissions: number })[]
  >(`${url}/api/projects/bk/stats/${tab}?interval=30d`, fetcher);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Devices
          <TabSelect
            options={["device", "browser", "os"]}
            selected={tab}
            selectAction={(option) => setTab(option as DeviceTabs)}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BarList
          data={
            data?.map((d) => ({
              icon: (
                <DeviceIcon display={d[tab]} tab={tab} className="h-4 w-4" />
              ),
              submissions: d.submissions,
              title: d[tab],
            })) || []
          }
          tab={tab}
          barBackground="bg-blue-100"
          maxSubmissions={data?.[0]?.submissions || 0}
        />
      </CardContent>
    </Card>
  );
}
