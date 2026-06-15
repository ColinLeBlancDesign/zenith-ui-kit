#!/usr/bin/env node
// Minimal MCP client for the local Figma Dev Mode MCP server (streamable HTTP).
// Usage:
//   node figma-mcp.mjs list
//   node figma-mcp.mjs call <toolName> '<jsonParams>'
const ENDPOINT = "http://127.0.0.1:3845/mcp";

function parseSSE(text) {
  // Collect all `data:` lines and return the last JSON-RPC result/error.
  const out = [];
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (t.startsWith("data:")) {
      const payload = t.slice(5).trim();
      try { out.push(JSON.parse(payload)); } catch {}
    }
  }
  return out;
}

async function rpc(sessionId, body) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream",
  };
  if (sessionId) headers["mcp-session-id"] = sessionId;
  const res = await fetch(ENDPOINT, { method: "POST", headers, body: JSON.stringify(body) });
  const sid = res.headers.get("mcp-session-id") || sessionId;
  const text = await res.text();
  const msgs = parseSSE(text);
  return { sid, msgs, status: res.status, raw: text };
}

async function main() {
  const [, , cmd, toolName, paramsJson] = process.argv;

  // 1. initialize
  const init = await rpc(null, {
    jsonrpc: "2.0", id: 1, method: "initialize",
    params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "claude-code", version: "1.0" } },
  });
  const sid = init.sid;

  // 2. initialized notification (no id)
  await rpc(sid, { jsonrpc: "2.0", method: "notifications/initialized" });

  if (cmd === "list") {
    const r = await rpc(sid, { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });
    const result = r.msgs.find((m) => m.id === 2)?.result;
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (cmd === "call") {
    const args = paramsJson ? JSON.parse(paramsJson) : {};
    const r = await rpc(sid, { jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: toolName, arguments: args } });
    const msg = r.msgs.find((m) => m.id === 3);
    if (!msg) { console.log("NO_RESPONSE", r.status, r.raw.slice(0, 500)); return; }
    if (msg.error) { console.log("ERROR", JSON.stringify(msg.error)); return; }
    // Print text content blocks raw; save image blocks to disk so they can be Read.
    let imgIdx = 0;
    for (const block of msg.result?.content ?? []) {
      if (block.type === "text") console.log(block.text);
      else if (block.type === "image" && block.data) {
        const ext = (block.mimeType || "image/png").split("/")[1] || "png";
        const safe = (toolName + "-" + (args.nodeId || "sel")).replace(/[^a-z0-9]+/gi, "_");
        const path = `/Users/colin/zenith-ui/.scripts/shots/${safe}${imgIdx ? "-" + imgIdx : ""}.${ext}`;
        const { writeFileSync, mkdirSync } = await import("node:fs");
        mkdirSync("/Users/colin/zenith-ui/.scripts/shots", { recursive: true });
        writeFileSync(path, Buffer.from(block.data, "base64"));
        console.log(`[image saved] ${path}`);
        imgIdx++;
      } else console.log(`[${block.type} block]`, JSON.stringify(block).slice(0, 200));
    }
    return;
  }

  console.log("Usage: figma-mcp.mjs list | call <tool> '<jsonParams>'");
}

main().catch((e) => { console.error("FATAL", e.message); process.exit(1); });
