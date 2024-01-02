"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartVertical,
  StretchHorizontal,
  StretchVertical,
} from "lucide-react";
import React, { useState } from "react";
import { ColorPicker } from "./color-picker";
import { ColorStyle } from "./color-style";

const Apperance = () => {
  const [color, setColor] = useState("#eeeeee");
  return (
    <div>
      <h1 className="text-4xl font-bold">Apperance</h1>
      <p className="text-zinc-700">Customise the look of the waitlist fomr</p>
      <div className="grid grid-cols-2">
        <div className="mt-4 border-t py-4 mr-8">
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="look">Look</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <h2 className="text-3xl font-medium">Basic</h2>
              <p className="text-zinc-700">Customise the basic look and feel</p>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-zinc-800">
                  Form Position
                </h3>
                <p className="text-xs text-zinc-700">
                  Form will algin to parent container
                </p>
                <div className="mt-4 flex gap-4">
                  <div className="hover:bg-zinc-200 p-2 rounded cursor-pointer">
                    <AlignEndVertical />
                  </div>
                  <div className="hover:bg-zinc-200 p-2 rounded cursor-pointer">
                    <AlignCenterVertical />
                  </div>
                  <div className="hover:bg-zinc-200 p-2 rounded cursor-pointer">
                    <AlignStartVertical />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-zinc-800">
                  Items Alignment
                </h3>
                <p className="text-xs text-zinc-700">
                  Form will algin to parent container
                </p>
                <div className="mt-4 flex gap-4">
                  <div className="hover:bg-zinc-200 p-2 rounded cursor-pointer">
                    <StretchHorizontal />
                  </div>
                  <div className="hover:bg-zinc-200 p-2 rounded cursor-pointer">
                    <StretchVertical />
                  </div>
                </div>
              </div>

              
            </TabsContent>
            <TabsContent value="look">
              <h2 className="text-3xl font-medium">Look</h2>
              <p className="text-zinc-700">Customise how the form looks</p>

              <div className="mt-4 p-2 border rounded-lg">
                <h3 className="text-xl font-medium">Input</h3>
                <ColorStyle title="Input Border Color" description="" />
                <ColorStyle title="Input Background Color" description="" />
                <ColorStyle title="Input Text Color" description="" />
                <ColorStyle title="Input Placeholder Color" description="" />
              </div>
              <div className="mt-4 p-2 border rounded-lg">
                <h3 className="text-xl font-medium">Button</h3>
                <ColorStyle title="Button Color" description="" />
                <ColorStyle title="Button Border Color" description="" />
                <ColorStyle title="Button Text Color" description="" />
              </div>
            </TabsContent>
          </Tabs>
          <div className="h-[30rem]"></div>
        </div>
        <div className="relative w-full h-full mt-8">
          <div className="sticky bg-zinc-200 overflow-hidden top-32 h-[400px] rounded-xl">
            <div className="p-3">
              <h3 className="text-2xl font-semibold">Preview</h3>
            </div>
            <div className="h-full pt-4 bg-white">
              <iframe
                src="http://localhost:3000/w/e/bk"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apperance;
