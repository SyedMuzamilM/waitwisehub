import React, { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "../icons";

import { useParams } from "next/navigation";
import { url } from "@/lib/constants";
import Link from "next/link";

export type Project = {
  id: string;
  short_id: string;
  name: string;
  url: string;
  user_id: string;
  created_at: string;
};

export function ProjectSelector() {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [selected, setSelected] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams() as { "project-id"?: string };

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

  useEffect(() => {
    setSelected(params["project-id"] ?? '')
  }, [params])

  return (
    <Select defaultValue={!isLoading ? selected : undefined}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Projects" />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          <SelectGroup>
            {projects.map((project) => (
              <SelectItem key={project.short_id} value={project.short_id}>
                  <Link href={`/dashboard/projects/${project.short_id}/overview`}>
                  {project.name}
              </Link>
                </SelectItem>
            ))}
            <SelectItem value="new-project">New Project</SelectItem>
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
