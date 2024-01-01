"use client";

import * as React from "react";

import { createBrowserClient } from "@supabase/ssr";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabaseAnonKey, supabaseApiKey, supabaseUrl } from "@/lib/constants";

export function CreateSiteForm() {
  const handleCreateProject = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    const name = formData.get("name")?.toString();
    const url = formData.get("url")?.toString();

    if (!name || !url) return;

    const supabase = createBrowserClient(supabaseUrl, supabaseApiKey);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) return alert("User not found...");

    const { data, error } = await supabase.from("sites").insert({
      name,
      url,
      short_id: 'bk',
      user_id: user.id,
    });

    console.log({ data, error })
  };

  return (
    <Card className="w-[420px]">
      <CardHeader>
        <CardTitle>Create new project</CardTitle>
        <CardDescription>
          Create a new Project you want to add waitlist form for.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleCreateProject}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url">Website URL</Label>
              <Input id="url" name="url" placeholder="URL of your website" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Create</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
