import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartVertical,
  StretchHorizontal,
  StretchVertical,
} from "lucide-react";
import { ColorStyle } from "./color-style";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BasicForm } from "./components/basic-form";

const Apperance = () => {
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

              <BasicForm />
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
