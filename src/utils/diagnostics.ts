import kleur from "kleur";
import type { Diagnostic } from "../lib/types.js";
import { SEPARATOR } from "./ai.js";

export function formatDiagnostic(diagnostic: Diagnostic): string {
  const location = diagnostic.file
    ? `${diagnostic.file}${diagnostic.line ? `:${diagnostic.line}` : ""}`
    : "-";
  return `${diagnostic.code} ${location} ${diagnostic.message}`;
}

export function printDiagnostics(diagnostics: Diagnostic[]): void {
  diagnostics.forEach((diagnostic, index) => {
    const line = formatDiagnostic(diagnostic);
    const color = diagnostic.severity === "error" ? kleur.red : kleur.yellow;
    console.error(color(line));
    if (diagnostic.fix) {
      console.error(`  Fix: ${diagnostic.fix}`);
    }
    if (index < diagnostics.length - 1) {
      console.error("");
    }
  });
}

export function printSuccessFiles(files: string[]): void {
  for (const file of files) {
    console.log(`${kleur.green("✓")} ${file} — OK`);
  }
}

export function printSummary(
  errors: number,
  warnings: number,
  options: { quiet?: boolean; json?: boolean; tipCommand?: string },
): void {
  if (options.json) {
    return;
  }

  const write = errors > 0 ? console.error : console.log;

  write("");
  write(SEPARATOR);
  write(`${errors} error${errors !== 1 ? "s" : ""} · ${warnings} warning${warnings !== 1 ? "s" : ""}`);

  if (errors > 0 && !options.quiet) {
    write("");
    write("Tip: use the AI workflow to fix these errors automatically.");
    write(`     ${options.tipCommand ?? "npx @withfrontmatter/solo-check --help-ai"}`);
  }

  write(SEPARATOR);
  write("");
}
