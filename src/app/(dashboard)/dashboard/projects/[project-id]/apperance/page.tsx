import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicForm } from "./components/basic-form";
import { LooksForm } from "./components/looks-form";
import { FormFrame } from "./components/form-frame";

const Apperance = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Appearance</h1>
      <p className="text-zinc-700">Customise the look of the waitlist form</p>
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

              <LooksForm />           
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
              <FormFrame />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apperance;
