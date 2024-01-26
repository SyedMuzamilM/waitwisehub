"use client";

import { Project } from "@/components/Sidebar/project-selector";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { url } from "@/lib/constants";
import {
  ChevronRightCircle,
  Plus,
  PlusCircle,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CreateProject } from "./create-project";
import { Button } from "@/components/ui/button";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProjects = async () => {
      const res = await fetch(`${url}/api/projects`);

      const json = await res.json();
      if (res.ok) {
        setProjects(json);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert(json);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between">
        <h1 className="flex-1 text-4xl font-bold">All Projects</h1>
        <div>
          <CreateProject>
            <Button className="rounded-full text-sm flex items-center">
              <Plus className="mr-2 w-5 h-5" />
              Create new
            </Button>
          </CreateProject>
        </div>
      </div>
      <p className="text-zinc-800">All projects you have created yet.</p>
      <div className="mt-4">
        {isLoading ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {!isLoading &&
              projects.map((it) => (
                <Link
                  key={it.site_id}
                  href={`/dashboard/projects/${it.short_id}/overview`}
                  className="group relative flex w-full h-full cursor-default flex-col overflow-hidden rounded-2xl border border-stone-500 bg-white outline-1 outline-offset-2 outline-sone-500 transition-colors duration-200 hover:border-outline-800 hover:bg-stone-100 focus-visible:outline shadow-lg"
                >
                  <button></button>
                  <div className="flex-1 roundex-t-2xl p-4">
                    <div className="mb-9 max-w-[90%] space-y-2">
                      <p className="font-medium">{it.name}</p>
                      <p className="text-sm text-ellipsis whitespace-nowrap leading-4">
                        {url}/projects/{it.short_id}/overview
                      </p>
                    </div>
                  <div className="flex items-center space-x-2">
                    <UsersRound className="w-4 h-4" />
                    <p className="font-medium">8 Submissions</p>
                  </div>
                  </div>
                  <div className="box-content overflow-hidden border-t border-zinc-800 px-[19px] pt-[11px] pb-3">
                    <div className="relative flex items-center justify-between">
                      <div className="flex w-full justify-between">
                        <p className="flex items-center space-x-1.5 overflow-hidden whitespace-nowrap text-xs leading-4 text-dark-muted">
                          <UserRoundPlus className="w-4 h-4" />
                          <span className="overflow-hidden overflow-ellipsis">
                            1 user joined in last hour
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                // <Card key={it.short_id} className="rounded-xl group">
                //   <CardHeader>
                //     <CardTitle className="text-medium group-hover:underline">{it.name}</CardTitle>
                //     <CardDescription>
                //       Lorem ipsum dolor sit amet consectetur adipisicing elit.
                //     </CardDescription>
                //   </CardHeader>
                //   <CardFooter className="flex justify-end">
                //     <Link href={`/dashboard/projects/${it.short_id}/overview`}>
                //       <ChevronRightCircle />
                //     </Link>
                //   </CardFooter>
                // </Card>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsPage;
