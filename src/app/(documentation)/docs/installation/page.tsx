import React from "react";
import { Markdown } from "@/components/markdown";

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

const getInstallationDoc = async () => {
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
  });
  return await res.json();
};

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
