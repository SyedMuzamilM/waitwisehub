"use client";

import { url } from "@/lib/constants";
import { useEffect, useLayoutEffect, useState } from "react";

const IFrame = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${url}/js/widget.js`;
    script.async = true;

    // Append the script to the document head
    document.head.appendChild(script);

    // Cleanup: Remove the script element when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [])

  return (
      <div className="waitwisehub-widget" data-key-id="bk"></div>
  );
};

export default IFrame;
