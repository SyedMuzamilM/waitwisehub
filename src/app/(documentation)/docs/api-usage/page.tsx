import React from "react";
import { Markdown } from "@/components/markdown";
import { url } from "@/lib/constants";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { PackageCheck } from "lucide-react";

const query = `
{
  docs {
    _slug,
    items {
      _slug
      _id
      title
      introduction {
        markdown
      }
      body {
        markdown
      }
    }
    _title
  }
}`;

const getInstallationDoc = async (): Promise<any> => {
  const res = await fetch("https://api.basehub.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer bshb_pk_pwt5hppyaelpqoap5k8l7r13a040zghadfczcwxd57gfrtnqfzuy2nupmv3caa4h",
    },
    body: JSON.stringify({
      query,
    }),
    cache: 'no-cache'
  });
  return await res.json();
};

export const metadata: Metadata = {
  metadataBase: new URL('https://waitwisehub.vercel.app'),
  title: 'API Usage - Docs | WaitWiseHub',
  description: 'How to use waitwisehub API',
  twitter: {
    creator: 'Syed Muzamil',
    creatorId: 'syedmuzamilm',
    card: 'summary_large_image'
  },
  openGraph: {
    images: [`${url}/api/og?heading=API Usage&mode=dark&type=docs`]
  }
}

const ApiUsage = async () => {
  const data = await getInstallationDoc();
  const item = data.data.docs.items[1]

  return (
    <React.Fragment>
      <Header />
      <main className="container py-16">
        <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
        <div className="mb-4">
          <Markdown content={item.introduction.markdown}/>
        </div>
        <Markdown content={item.body.markdown} />
      </main>
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

export default ApiUsage;
