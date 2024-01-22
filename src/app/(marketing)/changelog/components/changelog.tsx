import React from "react";
import { Changelog } from "../page";
import { RichText } from "basehub/react";
import { TwitterShare } from "./twitter-share";

export const ChangeLog = ({ changelog }: { changelog: Changelog }) => {
  return (
    <li className="grid grid-cols-1 lg:grid-cols-[222px_1fr] items-start xl:grid-cols-[228px_626px_228px] justify-between relative">
      <div className="hidden lg:flex flex-col-reverse font-medium text-dark-bright text-sm pr-12 leading-none sticky mt-2 mb-20 top-16">
        <span className="rounded-2xl text-light-faint px-3 py-1.5 inline-block border border-dark-border-solid text-xs bg-dark-shade max-w-max overflow-hidden lg:mt-4">
          v{changelog.version}
        </span>
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(changelog.releaseDate))}
      </div>
      <div className="relative before:absolute before:h-[calc(100%-28px)] before:-left-8 lg:before:border-l before:border-dark-border-solid before:top-7">
        <div className="mb-6 flex items-center font-medium text-dark-bright text-sm leading-none lg:hidden">
          <span className="mr-2 rounded-2xl text-light-faint px-3 py-1.5 inline-block border border-dark-border-solid text-xs bg-dark-shade max-w-max overflow-hidden lg:mt-4">
            v{changelog.version}
          </span>
          &nbsp;
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(changelog.releaseDate))}
        </div>
        <div className="h-4 w-4 hidden lg:block absolute top-1.5 -translate-x-[calc(theme(spacing.8)+theme(spacing.2))] border border-dark-bright rounded-full bg-dark-bg z-10 left-10 lg:left-auto"></div>
        <h5
          id="discard-changes"
          className="font-bold text-xl leading-tight relative scroll-mt-[calc(var(--header-height)+theme(spacing.6))]"
        >
          <a
            className="group rounded outline-1 outline-offset-2 outline-dark-control-base focus-visible:outline"
            href={`/changelog/${changelog._slug}`}
          >
            {changelog._title}
          </a>
        </h5>
        <p className="text-dark-muted text-base italic mt-3">
          {changelog.description}
        </p>
        <div className="mt-9">
          <article className="post-body_content">
            <RichText>{changelog.changes.json.content}</RichText>
          </article>
        </div>
        <footer className="grid gird-cols-1 md:grid-cols-2 gap-4 text-sm text-dark-faint mt-9">
          <TwitterShare slug={changelog._slug} title={changelog._title} />
        </footer>
      </div>
    </li>
  );
};
