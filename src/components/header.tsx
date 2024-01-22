import { PackageCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="bg-[#101010] py-2 fixed top-0 left-0 right-0 z-50 opacity-0 animate-fade-in"
      style={{ animationDelay: '0.30', animationFillMode: 'forwards' }}
    >
      <div className="container flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center md:gap-2">
            <PackageCheck className="text-[var(--accent-color)] text-5xl" />
            <span className="text-xl md:text-2xl text-mantis-50 font-medium">
              waitwisehub
            </span>
          </div>
        </Link>
        <div className="hidden lg:block rounded-full px-6">
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-mantis-50">
              Pricing
            </Link>
            <Link href="#" className="text-mantis-50">
              Blogs
            </Link>
            <Link href="/docs/installation" className="text-mantis-50">
              Docs
            </Link>
            <Link href="/changelog" className="text-mantis-50">
              Changelog
            </Link>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/signin" className="text-white hidden md:block">
            Login
          </Link>
          <Link href="/signup">
            <button className="rounded-full py-2 px-3 md:px-6 text-sm bg-black/50 text-white">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
