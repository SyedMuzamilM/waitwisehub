import React, { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "../icons";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProjects = async () => {
      const res = await fetch("http://localhost:3000/api/projects");

      const json = await res.json();
      if (res.ok) {
        setProjects(json);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert(json);
      }
    };

    fetchProjects()
  }, []);

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Projects" />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          <SelectGroup>
            {projects.map((project) => (
              <SelectItem value={project.short_id}>{project.name}</SelectItem>
            ))}
            <SelectItem value="new-project" >
                New Project
            </SelectItem>
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
