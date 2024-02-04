"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  Layout,
  LayoutDashboard,
  Megaphone,
  Menu,
  Newspaper,
  Settings,
  FileCode,
  Github,
  PackageCheck,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
// import { getSiteFromPostId } from "@/lib/actions";
import Image from "next/image";

const externalLinks = [
  {
    name: "Read announcement",
    href: "https://vercel.com/blog/platforms-starter-kit",
    icon: <Megaphone width={18} />,
  },
  {
    name: "Star on GitHub",
    href: "https://github.com/vercel/platforms",
    icon: <Github width={18} />,
  },
  {
    name: "Read the guide",
    href: "https://vercel.com/guides/nextjs-multi-tenant-application",
    icon: <FileCode width={18} />,
  },
  {
    name: "View demo site",
    href: "https://demo.vercel.pub",
    icon: <Layout width={18} />,
  },
  {
    name: "Deploy your own",
    href: "https://vercel.com/templates/next.js/platforms-starter-kit",
    icon: (
      <svg
        width={18}
        viewBox="0 0 76 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="py-1 text-black dark:text-white"
      >
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Nav() {
  const segments = useSelectedLayoutSegments();
  const params = useParams() as { "project-id"?: string };


  const tabs = useMemo(() => {
    if (segments.length > 2) {
      return [
        {
          name: "Back to All Projects",
          href: "/dashboard/projects",
          icon: <ArrowLeft width={18} />,
        },
        {
        name: "Overview",
        href: `/dashboard/projects/${params["project-id"]}/overview`,
        isActive: segments.includes("overview"),
        icon: <BarChart3 width={18} />,
      },
      {
      name: "Submissions",
      href: `/dashboard/projects/${params["project-id"]}/submissions`,
      isActive: segments.includes("submissions"),
      icon: <LayoutDashboard width={18} />,
    },
      {
        name: "Appearance",
        href: `/dashboard/projects/${params["project-id"]}/appearance`,
        isActive: segments.includes("appearance"),
        icon: <Globe width={18} />,
      },
      // {
      //   name: "Settings",
      //   href: `/dashboard/projects/${params["project-id"]}/settings`,
      //   isActive: segments.includes("settings"),
      //   icon: <Settings width={18} />,
      // },
      ];
    }
    return [
      {
        name: "Projects",
        href: "/dashboard/projects",
        isActive: segments[1] === "projects",
        icon: <LayoutDashboard width={18} />,
      },
      // {
      //   name: "Settings",
      //   href: "/dashboard/settings",
      //   isActive: segments[1] === "settings",
      //   icon: <Settings width={18} />,
      // },
    ];
  }, [segments, params]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "post" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <PackageCheck className="text-[var(--accent-color)]" /> 
            <span className="text-medium text-xl">waitwisehub</span>
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
