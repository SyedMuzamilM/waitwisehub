"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { GenerateKey } from "./generate-key";
import { url } from "@/lib/constants";
import { useParams } from 'next/navigation'

export type ApiKey = {
  id: string;
  expires: string;
  partial_key: string;
  created_at: string;
  name: string;
  last_used: string;
};

const ApiKey = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  const params = useParams() as { "project-id": string }

  useEffect(() => {
    const fetchApiKeys = async () => {
      const res = await fetch(`${url}/api/projects/${params["project-id"]}/tokens`);

      if (res.ok) {
        const json = await res.json();
        setApiKeys(json);
      } else {
        alert("Something went wrong while fetching api keys");
      }
    };

    fetchApiKeys();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`${url}/api/projects/${params["project-id"]}/tokens/${id}`, { method: "DELETE" })
    
    if (res.ok) {
      setApiKeys((keys) => keys.filter((key) => key.id !== id));
    } else {
      alert("Error while deleting API Key")
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">API Keys</h1>
      <p className="text-zinc-700 mb-4">
        Get Your API Keys and use it to store the form dataYour secret API keys
        are listed below. Please note that we do not display your secret API
        keys again after you generate them.
      </p>
      <p className="text-zinc-700">
        Do not share your API key with others, or expose it in the browser or
        other client-side code. In order to protect the security of your
        account, OpenAI may also automatically disable any API key that we&apos;ve
        found has leaked publicly.
      </p>

      <div className="border-t mt-4 py-4">
        <div className="max-w-3xl mb-4 w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="uppercase text-left border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Key</th>
                <th className="p-2">Created</th>
                <th className="p-2">Last used</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr key={key.created_at} className="text-left text-zinc-700 border-b">
                  <td className="p-2">{key.name}</td>
                  <td className="p-2">{key.partial_key}</td>
                  <td className="p-2">
                    {format(key.created_at, "MMM dd, yyyy")}
                  </td>
                  <td className="p-2">
                    {key.last_used && format(key.last_used, "MMM dd, yyyy")}
                  </td>
                  <th className="flex gap-2 p-2">
                    {/* <Pencil size={18} className="cursor-pointer" /> */}
                    <Trash2 onClick={() => handleDelete(key.id.toString())} size={18} className="cursor-pointer hover:text-red-700" />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <GenerateKey setApiKeys={setApiKeys}>
          <Button>
            <Plus /> Create new secret key
          </Button>
        </GenerateKey>
      </div>
    </div>
  );
};

export default ApiKey;
