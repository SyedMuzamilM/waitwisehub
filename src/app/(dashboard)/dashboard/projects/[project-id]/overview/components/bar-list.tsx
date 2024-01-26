import { cn, nFormatter } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from 'framer-motion'

export default function BarList({
  tab,
  data,
  maxSubmissions,
  barBackground,
}: {
  tab: string;
  data: {
    icon?: ReactNode;
    title: string;
    submissions: number;
  }[];
  maxSubmissions: number;
  barBackground: string;
}) {
  return (
    <div className="grid gap-4">
      {data.map(({ icon, title, submissions }, idx) => (
        <div key={idx} className="group flex items-center justify-between">
          <div className="relative z-10 flex w-full max-w-[calc(100%-2rem)] items-center">
            <div key={idx} className="z-10 flex items-center space-x-2 px-2">
              {icon}
              <p className="text-sm text-gray-800">{title}</p>
            </div>
            <motion.div
                style={{
                    width: `${(submissions / (maxSubmissions || 0) * 100)}%`
                }} 
                className={cn(
                    "absolute h-8 origin-left rounded-sm",
                    barBackground
                )}
                transition={{ ease: "easeOut", duration: 0.3 }}
                initial={{ transform: "scaleX(0)"}}
                animate={{ transform: "scaleX(1)"}}
            />
          </div>
          <p className="z-10 text-sm text-gray-800">
            {nFormatter(submissions)}
          </p>
        </div>
      ))}
    </div>
  );
}
