import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { url } from "@/lib/constants";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ApiKey } from "./page";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Icons } from "@/components/icons";

export function GenerateKey({
  children,
  setApiKeys,
}: {
  children: React.ReactNode;
  setApiKeys: React.Dispatch<React.SetStateAction<ApiKey[]>>;
}) {
  const [token, setToken] = useState<(ApiKey & { token: string }) | null>(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const params = useParams() as { "project-id": string };

  const handleCopy = () => {
    navigator.clipboard.writeText(token!.token).then(() => {
      setCopied(true);
    });
  };

  useEffect(() => {
    let timeout;
    if (copied === true) {
      timeout = setInterval(() => {
        setCopied(false);
      }, 500);
    }

    return clearInterval(timeout);
  }, [copied]);

  useEffect(() => {
    setName("");
    setToken(null);
  }, []);

  const handleGenerateApiKey = async () => {
    if (!name) return;
    setIsLoading(true);

    const res = await fetch(
      `${url}/api/projects/${params["project-id"]}/tokens`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    const json = await res.json();

    if (res.ok) {
      setToken(json);
      setApiKeys((apikeys) => [json, ...apikeys])
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert(JSON.stringify(json));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {token ? (
          <>
            <DialogHeader>
              <DialogTitle>Copy your API key</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input defaultValue={token.token} readOnly />
              </div>
              <Button
                onClick={handleCopy}
                type="submit"
                size="sm"
                className="px-3"
              >
                <span className="sr-only">Copy</span>
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create new secret key</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="name"
                  className="text-right flex items-center gap-2"
                >
                  Name <span className="text-zinc-700 text-xs">Optional</span>
                </Label>
                <Input
                  id="name"
                  placeholder="My Test Key"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleGenerateApiKey}
                disabled={isLoading}
                type="submit"
              >
                {isLoading && <Icons.spinner className="animate-spin" />} Create
                secret key
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
