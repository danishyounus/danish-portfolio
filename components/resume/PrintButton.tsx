"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-primary btn-sm">
      <Printer className="h-3.5 w-3.5" />
      Save as PDF
    </button>
  );
}
