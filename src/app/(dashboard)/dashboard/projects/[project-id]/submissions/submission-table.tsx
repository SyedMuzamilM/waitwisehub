"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";
import { format } from "date-fns";
import { url } from "@/lib/constants";
import { useParams } from "next/navigation";
import { InfoIcon } from "lucide-react";
import { InfoModel } from "./info-model";

export const SubmissionTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<
    {
      email: string;
      additional_data: any;
      created_at: string;
      ip?: string;
      geo?: any;
      user_agent?: string;
    }[]
  >([]);

  const params = useParams() as { "project-id": string };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const res = await fetch(
        `${url}/api/projects/${params["project-id"]}/submissions`
      );
      const json = await res.json();
      if (res.ok) {
        setData(json);
        setIsLoading(false);
      } else {
        alert(JSON.stringify(json));
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <Icons.spinner className="animate-spin" />;
  }

  if (!isLoading && !data.length) {
    return (
      <div>
        <p>There are no submssions yet</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Additional Data</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data?.map((it, index) => (
            <TableRow key={it.email}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <InfoModel
                  ip={it.ip}
                  geo={it.geo}
                  userAgent={it.user_agent}
                  email={it.email}
                  createdAt={it.created_at}
                >
                  <span className="underline">
                  {it.email}
                  </span>
                </InfoModel>
              </TableCell>
              <TableCell className="flex flex-col">
                {it.additional_data
                  ? Object.keys(it.additional_data).map((key) => (
                      <div className="flex" key={key}>
                        <span className="text-bold capitalize">{key}: </span>
                        <span>{it.additional_data[key]}</span>
                      </div>
                    ))
                  : "-"}
              </TableCell>
              <TableCell>{format(it.created_at, "MMM dd, yyyy")}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
