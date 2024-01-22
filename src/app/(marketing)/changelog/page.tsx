import { url } from "@/lib/constants";
import { Metadata } from "next";
import React from "react";
import Markdown from "react-markdown";
import { RichText } from "basehub/react";
import { ChangeLog } from "./components/changelog";

const query = `
{
  changelogs {
    _slug
    items {
      _slug
      _title
      version
      description
      releaseDate
      changes {
        json {
          content
        }
      }
    }
  }
}`;

const getChangelogs = async (): Promise<any> => {
  const res = await fetch("https://api.basehub.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer bshb_pk_obl7w4jivfrm3gwzumbtvnvtwegfioc4306ki9o7es99an9s8e1wvegvs1p4sgnh",
    },
    body: JSON.stringify({
      query,
    }),
    cache: "no-cache",
  });
  return await res.json();
};

export type Changelog = {
  _slug: string;
  _title: string;
  version: string;
  releaseDate: string;
  description: string;
  changes: {
    json: {
      content: unknown;
    };
  };
};

export const metadata: Metadata = {
  metadataBase: new URL("https://waitwisehub.blackkalu.com"),
  title: "Changelogs | WaitWiseHub",
  description: "waitwisehub changelogs - Check new updates to waitwisehub here",
  twitter: {
    creator: "Syed Muzamil",
    creatorId: "syedmuzamilm",
    card: "summary_large_image",
  },
  openGraph: {
    images: [`${url}/api/og?heading=waitwisehub changelogs&mode=light&type=`],
  },
};

const ChangelogsPage = async () => {
  const data = await getChangelogs();
  const changelogs = data.data.changelogs.items;

  return (
    <div className="relative flex min-h-screen justify-between w-full flex-col bg-black text-white">
      <main className="container md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[222px_1fr] items-start xl:grid-cols-[228px_626px_228px] justify-between">
          <header className="py-16 lg:col-start-2 lg:col-end-2">
            <h1 className="font-bold text-2xl leading-[38px]">Changelog</h1>
            <p className="text-dark-muted text-base mt-3 leading-6 3xl:text-base 3xl:leading-7">
              Recent updates and improvements to WaitWiseHub.
            </p>
          </header>
        </div>
        <ul className="flex flex-col space-y-14 lg:col-start-2 lg:col-end-2">
          {changelogs.map((changelog: Changelog) => (
            <ChangeLog changelog={changelog} key={changelog._slug} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ChangelogsPage;
