"use client";

import { useState, type ReactNode } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="copy-btn"
      data-copied={copied || undefined}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
    >
      <span className="copy-btn__pop" aria-hidden>
        Copied!
      </span>
      <span className="copy-btn__icons">
        <svg
          className="copy-btn__icon copy-btn__icon--copy"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <rect
            x="5.5"
            y="5.5"
            width="8.5"
            height="8.5"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M2.5 10.5V4a2 2 0 0 1 2-2h6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="copy-btn__icon copy-btn__icon--check"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M3 8.5L6.5 12L13 4.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export function InstallCommand({ cmd = "npm i zenith-ui-kit" }: { cmd?: string }) {
  return (
    <div className="install">
      <span className="install__dollar">$</span>
      <span>{cmd}</span>
      <CopyButton text={cmd} />
    </div>
  );
}

export function Demo({
  children,
  code,
  column,
  allowOverflow,
}: {
  children: ReactNode;
  code?: string;
  column?: boolean;
  allowOverflow?: boolean;
}) {
  return (
    <div className={"demo" + (allowOverflow ? " demo--overflow" : "")}>
      <div className={"demo__stage" + (column ? " demo__stage--col" : "")}>
        {children}
      </div>
      {code && (
        <pre className="demo__code">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
