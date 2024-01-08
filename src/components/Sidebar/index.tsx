"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
// import { GitHubLogoIcon } from "@radix-ui/react-icons"
import {
  Container,
  FormInput,
  GanttChartSquare,
  Home,
  Layers3,
  Library,
  LineChart,
  ListMusic,
  MessageSquarePlus,
  Mic2,
  Music2,
  Navigation,
  PackageCheck,
  Receipt,
  Table,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { ProjectSelector } from "./project-selector";

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  href?: string;
  icon?: React.ReactNode;
  items?: SidebarNavItem[];
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const menu = (id: string): SidebarNavItem[] => [
  {
    title: "Project",
    items: [
      {
        title: "Overview",
        href: `/dashboard/projects/${id}/overview`,
        icon: <Home size={16} />,
      },
      {
        title: "Appearance",
        href: `/dashboard/projects/${id}/appearance`,
        icon: <GanttChartSquare size={16} />,
      },
      {
        title: "Submissions",
        href: `/dashboard/projects/${id}/submissions`,
        icon: <Table size={16} />,
      },
      // {
      //   title: "Usage",
      //   href: `/dashboard/projects/${id}/usage`,
      //   icon: <LineChart size={16} />,
      // },
      // {
      //   title: "API Key",
      //   href: `/dashboard/projects/${id}/api-key`,
      //   icon: <Receipt size={16} />,
      // },
    ],
  },
  // {
  //   title: "Settings",
  //   items: [
  //     {
  //       title: "Inputs",
  //       href: "/dashboard/inputs",
  //       icon: <FormInput size={16} />,
  //     },
  //   ],
  // },
];

export default function Sidebar({ className, onClick }: SidebarProps) {
  const pathName = usePathname();
  const params = useParams() as { "project-id": string };

  return (
    <div
      className={cn(
        "flex h-full w-[240px] flex-col overflow-y-auto",
        className
      )}
    >
      <Link href="/dashboard/projects">
        <div className="flex h-16 w-full items-center px-4 gap-2 border-b text-lg font-medium text-brand">
          <PackageCheck className="text-brand-dark" /> waitwisehub
        </div>
      </Link>
      <div className="px-3 py-2">
        <ProjectSelector />
      </div>
      <div className="py-4">
        {params["project-id"] && menu(params["project-id"] ?? "").map((item, index) => (
          <div key={index} className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {item.title}
            </h2>
            {item.items ? (
              <SidebarItems
                pathName={pathName}
                onClick={onClick}
                items={item.items}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarItems({
  items,
  pathName,
  onClick,
}: {
  onClick?: () => void;

  items: SidebarNavItem[];
  pathName: string | null;
}) {
  return items.length
    ? items.map((item, index) => (
        <Button
          key={index}
          asChild
          onClick={onClick}
          variant={item.href === pathName ? "secondary" : "ghost"}
          className={cn("mb-1 w-full justify-start", {
            "text-primary": item.href === pathName,
          })}
        >
          {!item.disabled && item.href ? (
            <Link href={item.href}>
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.title}
            </Link>
          ) : (
            <span className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">
              {item.title}
            </span>
          )}
        </Button>
      ))
    : null;
}
