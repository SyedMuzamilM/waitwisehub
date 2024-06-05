import React from "react";
import { Markdown } from "@/components/markdown";
import { url } from "@/lib/constants";
import { Metadata } from "next";

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
  title: 'Installation - Docs | WaitWiseHub',
  description: 'How to install the waitwisehub widget in to your website',
  twitter: {
    creator: 'Syed Muzamil',
    creatorId: 'syedmuzamilm',
    card: 'summary_large_image'
  },
  openGraph: {
    images: [`${url}/api/og?heading=Installation&mode=dark&type=docs`]
  }
}

const InstallationDocs = async () => {
  const data = await getInstallationDoc();
  const item = data.data.docs.items[0]

  return (
    <main className="container">
      <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
      <div className="mb-4">
        <Markdown content={item.introduction.markdown}/>
      </div>
      <Markdown content={item.body.markdown} />
    </main>
  );
};

export default InstallationDocs;
