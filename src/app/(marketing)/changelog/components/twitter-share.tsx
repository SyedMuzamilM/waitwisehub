import React from "react";

export const TwitterShare = ({ title, slug }: { title: string; slug: string; }) => {
  const text = `Read about "${title}" in this changelog.`
  return (
    <div>
      Share this changelog
      <a
        target="_blank"
        rel="noopener noreferer"
        className="max-w-max flex items-center hover:text-dark-muted transition-colors duration-150 ease-in-out mt-2.5 rounded outline-1 outline-offset-2 outline-dark-control-base focus-visible:outline"
        href={`https://x.com/intent/tweet?text=${text}.%0A%0A%0A%E2%86%92%20https://waitwisehub.vercel.app/changelog/${slug}`}
      >
        <svg
          className="w-4 mr-2.5"
          viewBox="0 0 21.57 19.5"
          width="21.57"
          height="19.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.99 0h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L3.736 19.5H.426l7.73-8.835L0 0h6.826l4.713 6.231L16.99 0Zm-1.161 17.52h1.833L5.83 1.876H3.863L15.829 17.52Z"
            fill="currentColor"
          ></path>
        </svg>
        Write a tweet
      </a>
    </div>
  );
};
