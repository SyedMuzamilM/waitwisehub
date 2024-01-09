import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseUserAgent } from "@/lib/useragentparser";
import { DialogTitle } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import React from "react";

export const InfoModel: React.FC<{
  children: React.ReactNode;
  geo?: {
    city?: string;
    country?: string;
    region?: string;
  };
  ip?: string;
  userAgent?: string;
  createdAt: string;
  email: string;
}> = ({ children, geo, ip, userAgent, createdAt, email }) => {
  const agentInfo = parseUserAgent(userAgent ?? "")

  return (
    <Dialog>
      <DialogTrigger className="">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{email}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IP</TableCell>
              <TableCell>{ip}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Device</TableCell>
              <TableCell>{agentInfo.device}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>OS</TableCell>
              <TableCell>{agentInfo.os}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Browser</TableCell>
              <TableCell>{agentInfo.browser}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>{geo?.country}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Region</TableCell>
              <TableCell>{geo?.region}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>City</TableCell>
              <TableCell>{geo?.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Joined At</TableCell>
              <TableCell>{format(createdAt, 'dd MMM, yyyy')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};
