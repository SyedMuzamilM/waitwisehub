import React from "react";
import { ColorPicker } from "./color-picker";

export const ColorStyle: React.FC<{
  title: string;
  description: string;
  defaultColor: string;
  onChange: (color: string) => void;
}> = ({ title, description, defaultColor, onChange }) => {
  return (
    <div className="mt-4">
      <h3 className="text-md font-medium text-zinc-800">{title}</h3>
      <p className="text-sm text-zinc-700">{description}</p>

      <div className="flex gap-2 items-center mt-2">
        <ColorPicker onChange={onChange} color={defaultColor}>
          <div
            className="p-2 rounded-xl h-10 w-10 border"
            style={{ backgroundColor: defaultColor }}
          ></div>
        </ColorPicker>
        <div className="p-2 w-full rounded-xl bg-gray-100">{defaultColor}</div>
      </div>
    </div>
  );
};
