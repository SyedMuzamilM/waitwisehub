import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "../signin/components/user-auth-form";
import { PackageCheck } from "lucide-react";

import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden">
        <Header />
      </div>
      <div className="hidden">
        {/* <Image
          src="/og.png"
          width={1280}
          height={843}
          alt="Authentication"
          // className="block dark:hidden"
        /> */}
        {/* <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          // className="hidden dark:block"
        /> */}
      </div>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 mt-24 md:mt-0">
        <Link
          href="/signin"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 -top-10 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <Link href="/">
            <div className="relative z-20 flex items-center text-lg font-medium">
              <PackageCheck />
              waitwisehub
            </div>
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Transform Waiting into Winning – Elevate Your Startup! 🚀
                Join WaitwiseHub, the Ultimate Waitlist Platform. Focus on
                Perfecting Your Product, Not Just Collecting Signups!.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Signup</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to signup
              </p>
            </div>
            <UserAuthForm signup />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
