import React from "react";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";

const playfaire = Playfair_Display({ subsets: ["latin"] });

export const HeroSection = () => {
  return (
    <section className="-bg-brand/60 py-16">
      <div className="container flex flex-col items-center gap-5 max-w-[64rem]">
        <div className="mb-12 flex flex-col items-center text-center gap-5">
          <h1
            className={cn(
              "text-4xl font-extrabold tracking-light sm:text-5xl md:text-6xl lg:text-7xl text-mantis-800",
              playfaire.className
            )}
          >
            {/* Supercharge Your Launch: Turbo-Boost Early Signups with
              WaitwiseHub! */}
            <Balancer>WaitWiseHub - Supercharge Your Launch</Balancer>
          </h1>
          <p className="text-mantis-800 max-w-[42rem] leading-normal text-muted-foreground sm:text-sm md:text-xl sm:leading-0">
            <Balancer>
              Transform Waiting into Winning – Elevate Your Startup! 🚀 Join
              WaitwiseHub, the Ultimate Waitlist Platform. Focus on Perfecting
              Your Product, Not Just Collecting Signups!
            </Balancer>
          </p>
        </div>
        <div className="flex gap-4 md:gap-8">
          <button className="bg-mantis-900 hover:bg-mantis-950 transition-colors shadow-md rounded-full py-3 px-4 md:py-3 md:px-6 text-white font-medium">
            Build your waitlist
          </button>
          <button className="bg-mantis-100 hover:bg-mantis-200 transition-colors rounded-full py-3 px-4 md:py-3 md:px-6 text-brand-dark font-medium">
            View demo
          </button>
        </div>
      </div>
    </section>
  );
};
