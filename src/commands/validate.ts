import { runSoloRules } from "@withfrontmatter/solo-rules";
import type { Diagnostic, SoloCheckJsonResult, SoloCheckResult, ValidateCommandOptions } from "../lib/types.js";
import { runCoreScan } from "../core/bridge.js";
import { printDiagnostics, printSuccessFiles, printSummary } from "../utils/diagnostics.js";
import { resolveRoot } from "../utils/paths.js";

export async function runValidation(options: ValidateCommandOptions): Promise<SoloCheckResult> {
  const root = resolveRoot(options.root);
  const { build, diagnostics: coreDiagnostics } = await runCoreScan(root, options.debug);
  const rules = await runSoloRules({ root, build });
  const diagnostics = [...coreDiagnostics, ...rules.diagnostics];

  if (options.strict) {
    for (const diagnostic of diagnostics) {
      if (diagnostic.severity === "warning") {
        diagnostic.severity = "error";
      }
    }
  }

  return {
    build,
    diagnostics: dedupeDiagnostics(diagnostics),
    skippedComponents: rules.skippedComponents,
  };
}

export async function runValidate(options: ValidateCommandOptions): Promise<number> {
  const result = await runValidation(options);
  const hasErrors = result.diagnostics.some((item) => item.severity === "error");
  const errors = result.diagnostics.filter((item) => item.severity === "error").length;
  const warnings = result.diagnostics.filter((item) => item.severity === "warning").length;

  if (options.json) {
    const payload: SoloCheckJsonResult = {
      ok: !hasErrors,
      diagnostics: result.diagnostics,
      exitCode: hasErrors ? 1 : 0,
    };
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
    return payload.exitCode;
  }

  if (!options.quiet) {
    if (hasErrors) {
      printDiagnostics(result.diagnostics);
    } else {
      printSuccessFiles(getValidatedFiles(result.build.pages.map((page) => page.file)));
    }
  }

  printSummary(errors, warnings, {
    quiet: options.quiet,
    json: options.json,
    tipCommand: "npx @withfrontmatter/solo-check --help-ai",
  });

  return hasErrors ? 1 : 0;
}

function getValidatedFiles(files: string[]): string[] {
  return [...new Set(files)].sort((left, right) => left.localeCompare(right));
}

function dedupeDiagnostics(diagnostics: Diagnostic[]): Diagnostic[] {
  const seen = new Set<string>();
  const result: Diagnostic[] = [];
  for (const diagnostic of diagnostics) {
    const key = JSON.stringify(diagnostic);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(diagnostic);
    }
  }
  return result;
}
