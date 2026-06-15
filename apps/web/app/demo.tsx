"use client";

import { useState, type ReactNode } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="copy-btn"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}

export function InstallCommand({ cmd = "npm i zenith-ui" }: { cmd?: string }) {
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
