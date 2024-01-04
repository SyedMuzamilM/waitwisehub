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
import { ChevronRightCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CreateProject } from "./create-project";

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
    <div>
      <h1 className="text-4xl font-bold">All Projects</h1>
      <p className="text-zinc-800">All projects you have created yet.</p>
      <div className="mt-4">
        {isLoading ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {!isLoading &&
              projects.map((it) => (
                <Card key={it.short_id}>
                  <CardHeader>
                    <CardTitle>{it.name}</CardTitle>
                    <CardDescription>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>Some stats may be</CardContent>
                  <CardFooter className="flex justify-end">
                    <Link href={`/dashboard/projects/${it.short_id}/overview`}>
                      <ChevronRightCircle />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            <CreateProject>
              <Card className="cursor-pointer w-full h-full">
                <CardContent className="w-full h-full flex flex-col gap-4 items-center justify-center">
                  <PlusCircle size="40" />
                  <p>Create New Project</p>
                </CardContent>
              </Card>
            </CreateProject>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
