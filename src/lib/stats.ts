import { SupabaseClient } from "@supabase/supabase-js";
import { parseUserAgent } from "./useragentparser";

export type IntervalProps = "1h" | "24h" | "7d" | "30d" | "90d" | "all";

export const INTERVALS = [
  {
    display: "Last hour",
    value: "1h",
  },
  {
    display: "Last 24 hours",
    value: "24h",
  },
  {
    display: "Last 7 days",
    value: "7d",
  },
  {
    display: "Last 30 days",
    value: "30d",
  },
  {
    display: "Last 3 months",
    value: "90d",
  },
  {
    display: "All Time",
    value: "all",
  },
];

export const intervalData = {
  "1h": {
    startDate: new Date(Date.now() - 3600000),
    granularity: "minute",
  },
  "24h": {
    startDate: new Date(Date.now() - 86400000),
    granularity: "hour",
  },
  "7d": {
    startDate: new Date(Date.now() - 604800000),
    granularity: "day",
  },
  "30d": {
    startDate: new Date(Date.now() - 2592000000),
    granularity: "day",
  },
  "90d": {
    startDate: new Date(Date.now() - 7776000000),
    granularity: "month",
  },
  all: {
    // waitwisehub founding date
    startDate: new Date("2024-01-01"),
    granularity: "month",
  },
};

export type LocationTabs = "country" | "city" | "region";

export type DeviceTabs = "device" | "browser" | "os" | "ua";

const ENDPOINTS = [
  "timeseries",
  "clicks",
  "top_links",
  "country",
  "city",
  "device",
  "browser",
  "os",
  "referer",
];

export const VALID_STATS_FILTERS = [
  "country",
  "city",
  "device",
  "browser",
  "os",
  "referer",
];

export const getStats = async (
  supabase: SupabaseClient,
  {
    projectId,
    endpoint,
    interval = "1h",
  }: {
    projectId: string;
    endpoint: string;
    interval: string | null;
  }
) => {
  // get all-time clicks count if:
  // 1. endpoint is /clicks
  // 2. interval is not defined

  if (interval === "90d" || interval === "all") {
    throw new Error("Pro plan required");
  }

  const { data, error } = await supabase
    .from("submissions")
    .select("*, form:form_id(site_id, project:site_id(short_id))")
    .eq("form.project.short_id", projectId)
    .filter(
      "created_at",
      "gte",
      intervalData[interval as IntervalProps].startDate.toISOString()
    );
  if (error) {
    throw new Error(`Error fetching submissions: ${error.message}`);
  }

  // Todo: Get the specific data and filter that
  // submissions based upon the date
  if (endpoint === "timeseries") {
    const formattedData = data.reduce((acc, curr) => {
      const date = new Date(curr.created_at).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = { start: date, submissions: 0 };
      }
      acc[date].submissions += 1;
      return acc;
    }, {});

    // Get the start and end dates
    const startDate = intervalData[interval as IntervalProps].startDate
    const endDate = new Date();

    // Create a new date object for iteration to avoid mutation of startDate
    let iterDate = new Date(startDate);

    // Iterate over each day in the range and add missing dates to the formattedData
    const timeSeriesData: any = {}
    while (iterDate <= endDate) {
      const date = iterDate.toISOString().split("T")[0];
      if (formattedData[date]) {
        timeSeriesData[date] = formattedData[date]
      } else {
        timeSeriesData[date] = { start : date, submissions: 0}
      }
      // Increment the date
      iterDate.setDate(iterDate.getDate() + 1);
    }

    return Object.values(timeSeriesData);
  }

  if (endpoint === "country" || endpoint === "city") {
    const formattedData = data.reduce((acc, curr) => {
      const country = curr.geo?.country ?? "";
      const city = curr.geo?.city ?? "";
      const d = endpoint === "country" ? country : city;
      if (!acc[d]) {
        acc[d] = { [endpoint]: d, submissions: 0 };
        if (endpoint === "city") {
          acc[d].country = country
        }
      }
      acc[d].submissions += 1;
      return acc;
    }, {});

    const sortedData = Object.values(formattedData).sort(
      (a: any, b: any) => b.submissions - a.submissions
    );
    return sortedData;
  }

  if (endpoint === "device" || endpoint === "browser" || endpoint === "os") {
    const formattedData = data.reduce((acc, curr) => {
      const { browser, device, os } = parseUserAgent(curr.user_agent);
      const d =
        endpoint === "browser" ? browser : endpoint === "device" ? device : os;
      if (!acc[d]) {
        acc[d] = { [endpoint]: d, submissions: 0 };
      }
      acc[d].submissions += 1;
      return acc;
    }, {});

    const sortedData = Object.values(formattedData).sort(
      (a: any, b: any) => b.submissions - a.submissions
    );
    return sortedData;
  }

  return [];
};
