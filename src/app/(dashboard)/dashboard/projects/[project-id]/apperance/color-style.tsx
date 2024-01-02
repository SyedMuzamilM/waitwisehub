"use client";

import React, { useState } from "react";
import { ColorPicker } from "./color-picker";

export const ColorStyle: React.FC<{
    title: string;
    description: string;
}> = ({ title, description }) => {
  const [color, setColor] = useState("#eeeeee");
  return (
    <div className="mt-4">
      <h3 className="text-md font-medium text-zinc-800">{title}</h3>
      <p className="text-sm text-zinc-700">{description}</p>

      <div className="mt-2">
        <ColorPicker onChange={(color) => setColor(color)} color={color}>
          <div
            className="p-2 w-full rounded-xl"
            style={{ backgroundColor: color }}
          >
            {color}
          </div>
        </ColorPicker>
      </div>
    </div>
  );
};
