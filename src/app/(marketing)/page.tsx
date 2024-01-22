import { PackageCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { HeroSection } from "./components/hero-section";
import Balancer from "react-wrap-balancer";
import customise from "@/assets/images/appearance.png";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const IFrame = dynamic(() => import("./components/iframe"), { ssr: false });

import submission from "@/assets/images/submission.png";
import submissionDetails from "@/assets/images/submission-details.png";

const playfaire = Playfair_Display({ subsets: ["latin"] });

const Page = () => {
  return (
    <React.Fragment>
      <HeroSection />
      <section className="relative bg-black/20">
        <div className="container py-12 flex flex-col lg:flex-row">
          <div className="max-w-xl">
            <span className="pointer-events-none relative z-10 mb-12 flex h-[30px] w-fit select-none items-center justify-center rounded-full border border-[#1B1B1B] bg-gradient-basic px-3.5 text-xs leading-none text-dark-faint">
              Precision in Customization
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-6 text-black">
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
                  Customize forms effortlessly for your project&apos;s unique
                  style.
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
            <Image src={customise} alt="Customise" fill />
          </div>
        </div>
      </section>
      <section className="relative bg-black">
        <div className="container py-14">
          <div className="mx-auto max-w-3xl space-y-4 mb-8">
            <h2 className="text-4xl font-bold text-white text-center">
              <Balancer>
                Maximize Insights with WaitwiseHub's Submissions Table
              </Balancer>
            </h2>
            <p className="text-gray-200 text-center">
              <Balancer>
                Inform Your Strategy: Access Regional and Device Data for
                Informed Decision-Making and Personalized Experiences.
              </Balancer>
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6">
            <Image
              src={submission}
              alt="Submission Table"
              className="col-span-2"
            />
            <Image src={submissionDetails} alt="Submission Detail" />
          </div>
        </div>
      </section>
      <footer className="bg-black border-t py-4">
        <div className="container">
          <div className="flex justify-between text-zinc-300">
            <div>
              <div className="flex items-center md:gap-2">
                <PackageCheck className="text-[var(--accent-color)]" />
                <span className="text-base font-bold">
                  waitwisehub
                </span>
              </div>
              <p className="text-xs">
                waitwisehub - supercharge your launch
              </p>
            </div>
            <a
              target="_blank"
              rel="noopener"
              aria-label="X"
              className="flex h-full w-[47px] items-center justify-center border-dark-border text-dark-elevated transition-colors duration-150 hover:text-dark-faint rounded outline-1 outline-offset-2 outline-dark-control-base focus-visible:outline"
              href="https://x.com/syedmuzamilm"
            >
              <svg
                className=""
                viewBox="0 0 21.57 19.5"
                width="21.57"
                height="19.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.99 0h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L3.736 19.5H.426l7.73-8.835L0 0h6.826l4.713 6.231L16.99 0Zm-1.161 17.52h1.833L5.83 1.876H3.863L15.829 17.52Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Page;
