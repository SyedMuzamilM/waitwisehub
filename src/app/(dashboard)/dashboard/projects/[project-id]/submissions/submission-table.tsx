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

export const SubmissionTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{ email: string; created_at: string }[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const res = await fetch(
        `${url}/api/projects/bk/submissions`
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S. No.</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data.map((it, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{it.email}</TableCell>
              <TableCell>{format(it.created_at, "MMM dd, yyyy")}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};