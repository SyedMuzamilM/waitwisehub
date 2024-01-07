import React from "react";
import appearance from "@/assets/images/appearance.png";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="bg-brand py-16">
      <div className="container flex justify-between">
        <div>
          <div className="mb-12">
            <h1 className="text-2xl md:text-4xl text-white font-bold max-w-xl mb-6">
              Supercharge Your Launch: Turbo-Boost Early Signups with
              WaitwiseHub!
            </h1>
            <p className="text-xl text-white max-w-3xl">
              Transform Waiting into Winning – Elevate Your Startup! 🚀 Join
              WaitwiseHub, the Ultimate Waitlist Platform. Focus on Perfecting
              Your Product, Not Just Collecting Signups!
            </p>
          </div>
          <div className="flex gap-4 md:gap-8">
            <button className="bg-brand-dark shadow-md rounded-full py-2 px-3 md:px-6 text-white font-medium">
              Build your waitlist
            </button>
            <button className="bg-lime-100 rounded-full py-2 px-3 md:px-6 text-brand-dark font-medium">
              View demo
            </button>
          </div>
        </div>
        {/* <div>
          <Image src={appearance} alt="Apperance Image" />
        </div> */}
      </div>
    </section>
  );
};
