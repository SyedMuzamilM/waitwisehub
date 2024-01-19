import { PackageCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { HeroSection } from "./components/hero-section";
import Balancer from "react-wrap-balancer";
import customise from '@/assets/images/appearance.png'
import Image from 'next/image'
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import { url } from "@/lib/constants";
import dynamic from 'next/dynamic'

const IFrame = dynamic(() => import('./components/iframe'), { ssr: false })

const playfaire = Playfair_Display({ subsets: ["latin"] });

const Page = () => {
  return (
    <React.Fragment>
      <HeroSection />
      <section className="relative bg-mantis-300">
        <div className="container py-12 flex flex-col lg:flex-row">
          <div className="max-w-xl">
            <span className="bg-mantis-100 border border-mantis-800 rounded-full py-1 px-4 text-sm font-medium text-mantis-800">
              Precision in Customization
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-6 text-mantis-950">
              <Balancer>
                Enhance Your Project with Effortless Refinement of Waitlist
                Forms.
              </Balancer>
            </h2>
            <p className="text-xl">
              <Balancer>
                Effortlessly Tailor Your Waitlist Form for a Captivating User
                Experience. Dive into Seamless Customization with Our Pre-launch
                Forms, Designed to Delight.
              </Balancer>
            </p>
            <div className="mt-6">
              <ul className="">
                <li className="flex items-center mb-2">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Customize forms effortlessly for your project&apos;s unique style.
                </li>
                <li className="flex items-center mb-2">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Integrate seamlessly with other tools using our accessible
                  API.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Collect specific user data with customizable fields.
                </li>
              </ul>
            </div>
          </div>
          <div className="relative mt-6 md:mt-0 w-full h-[320px] md:h-[550px]">
            <Image src={customise} alt="Customise" fill/>
          </div>
        </div>
      </section>
      <section className="bg-mantis-100 py-16">
        <div className="container flex flex-col items-center">
            <h2 className={cn("text-2xl sm:text-3xl md:text-4xl font-bold text-mantis-800 mb-4", playfaire.className)}>
                Join the waitlist
            </h2>
            <p className="mb-2">Get early access by joining the waitlist</p>
            <IFrame />
            {/* <div className="max-w-sm w-full h-[260px] overflow-hidden">
                <iframe src={`${url}/w/e/bk`} width="100%" height="100%"/>
            </div> */}
        </div>
      </section>
      <footer className="bg-mantis-900 py-12">
        <div className="container">
            <div>
            <div className="flex items-center md:gap-2">
            <PackageCheck className="text-mantis-50 text-5xl" />
            <span className="text-xl md:text-2xl text-mantis-50 font-bold">
              waitwisehub
            </span>
          </div>
          <p className="text-mantis-50 ">waitwisehub - supercharge your launch</p>
            </div>
            <div className="my-4 py-4 border-t border-t-mantis-50 text-mantis-50">
                &copy; {(new Date()).getFullYear()} waitwisehub
            </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Page;
