import { PackageCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="bg-mantis-900 py-4">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center md:gap-2">
            <PackageCheck className="text-mantis-50 text-5xl" />
            <span className="text-xl md:text-2xl text-mantis-50 font-bold">
              waitwisehub
            </span>
          </div>
        </Link>
        <div className="hidden lg:block rounded-full px-6 py-2 border border-mantis-50/90">
          <div className="flex items-center gap-6">
            <Link href="#" className="text-mantis-50">
              Pricing
            </Link>
            <Link href="#" className="text-mantis-50">
              Blogs
            </Link>
            <Link href="/docs/installation" className="text-mantis-50">
              Docs
            </Link>
            <Link href="/changelogs" className="text-mantis-50">
              Changelog
            </Link>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/signin" className="text-white hidden md:block">
            Login
          </Link>
          <Link href="/signup">
            <button className="rounded-full py-2 px-3 md:px-6 text-brand-dark bg-mantis-50">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
