"use client";
import { useState } from "react";
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(`${label} copied.`);
    } catch {
      setMessage(`Could not copy. Select the ${label.toLowerCase()} and copy it manually.`);
    }
  }
  return <span className="inline-flex flex-wrap items-center gap-2">
    <button className="button-secondary" type="button" aria-label={`Copy ${label}`} onClick={copy}>Copy</button>
    <span role="status" aria-live="polite" className="text-sm text-muted">{message}</span>
  </span>;
}
