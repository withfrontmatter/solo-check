import type { FrontmatterBuild } from "@withfrontmatter/core";
import type { Diagnostic, Severity, SkippedComponent } from "@withfrontmatter/solo-rules";

export type { Diagnostic, Severity, SkippedComponent } from "@withfrontmatter/solo-rules";

export type SharedCommandOptions = {
  root?: string;
  quiet?: boolean;
  debug?: boolean;
};

export type ValidateCommandOptions = SharedCommandOptions & {
  strict?: boolean;
  json?: boolean;
  helpAi?: boolean;
};

export type SoloCheckResult = {
  build: FrontmatterBuild;
  diagnostics: Diagnostic[];
  skippedComponents: SkippedComponent[];
};

export type SoloCheckJsonResult = {
  ok: boolean;
  diagnostics: Diagnostic[];
  exitCode: number;
};

export type _TypesAnchor = Severity;
