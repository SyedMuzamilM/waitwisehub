"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl, url } from "@/lib/constants";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  signup?: boolean;
}

export function UserAuthForm({
  className,
  signup = false,
  ...props
}: UserAuthFormProps) {
  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      setIsLoading(false);
      return;
    }

    if (signup) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${url}/dashboard/`,
        },
      });

      if (error) {
        alert(error);
        setIsLoading(false);
        return;
      }

      if (data) {
        setMessage("We have sent you the confirmation email");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error);
        setIsLoading(false);
        return;
      }

      if (data) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
        router.push("/dashboard/projects");
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {message && <p className="">{message}</p>}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              name="email"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="*******"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              name="password"
              disabled={isLoading}
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {signup ? "Sign Up with Email" : "Sign In with Email"}
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button> */}
    </div>
  );
}
