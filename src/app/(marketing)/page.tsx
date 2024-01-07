import { PackageCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { HeroSection } from "./components/hero-section";

const Page = () => {
  return (
    <React.Fragment>
      <header className="bg-brand py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center md:gap-2">
            <PackageCheck className="text-mantis-50 text-5xl" />
            <span className="text-xl md:text-2xl text-mantis-50 font-bold">waitwisehub</span>
          </div>
          <div className="hidden md:block rounded-full px-6 py-2 border border-mantis-50/90">
            <div className="flex items-center gap-6">
            <a href="#" className="text-mantis-50">Product</a>
            <a href="#" className="text-mantis-50">Pricing</a>
            <a href="#" className="text-mantis-50">Company</a>
            <a href="#" className="text-mantis-50">Blog</a>
            <a href="#" className="text-mantis-50">Changelog</a>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/signin" className="text-white">Login</Link>
            <Link href="/signup">
                <button className="rounded-full py-2 px-3 md:px-6 text-brand-dark bg-mantis-50">Get started</button>
            </Link>
          </div>
        </div>
      </header>
      <HeroSection />
      {/* <section className="container py-16">
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <p className="text-xl max-w-lg text-center">We give you an overview of all the features so you can decide weather to use the tool or not</p>
            <div className="flex gap-12 mt-8">
                <div className="w-[320px] h-[320px] bg-gray-200"></div>
                <div className="w-[320px] h-[320px] bg-red-300"></div>
            </div>
        </div>
      </section> */}
    </React.Fragment>
  );
};

export default Page;
