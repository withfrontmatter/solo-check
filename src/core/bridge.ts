import { scanProject, validateBuild, type FrontmatterBuild } from "@withfrontmatter/core";
import type { Diagnostic } from "../lib/types.js";

export async function runCoreScan(root: string, debug = false): Promise<{
  build: FrontmatterBuild;
  diagnostics: Diagnostic[];
}> {
  const result = await scanProject({ root, outDir: root, verbose: debug });

  const diagnostics: Diagnostic[] = [];
  for (const error of result.errors) {
    diagnostics.push({
      code: "E001",
      severity: "error",
      message: error.message,
      fix: "Fix the Frontmatter Core scan error before building Solo output.",
    });
  }

  for (const message of validateBuild(result.build)) {
    diagnostics.push({
      code: "E002",
      severity: "error",
      message,
      fix: "Ensure the Core IR is valid before running Solo.",
    });
  }

  return {
    build: result.build,
    diagnostics,
  };
}
