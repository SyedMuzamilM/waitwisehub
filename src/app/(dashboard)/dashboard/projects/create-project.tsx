"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { url } from "@/lib/constants";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

export const CreateProject: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [data, setData] = useState<{ name: string; url: string }>({
    name: "",
    url: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateProject = async () => {
    if (!data.name || !data.url) return;

    setIsLoading(true);

    const res = await fetch(`${url}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      alert(JSON.stringify(json));
      setIsLoading(false);
      return;
    }

    router.push(`/dashboard/projects/${json.short_id}/overview`);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full h-full">{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              type="url"
              name="url"
              value={data.url}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreateProject}
            disabled={isLoading}
            type="submit"
          >
            {isLoading && <Icons.spinner className="animate-spin" />} Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
