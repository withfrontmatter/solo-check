#!/usr/bin/env node
import { Command, CommanderError } from "commander";
import { runValidate } from "./commands/validate.js";
import { printHelpAi } from "./utils/ai.js";
import { getPackageVersion } from "./utils/version.js";

const HELP = `Frontmatter Solo Check
Usage: frontmatter-check [options]

Options:
--root <path>
--strict
--json
--quiet
--help-ai
-h, --help
`;

function createProgram(version: string): Command {
  const program = new Command();
  program
    .name("frontmatter-check")
    .description("Validate a project against the Frontmatter Solo contract.")
    .version(version, "-v, --version", "Display CLI version")
    .helpOption("-h, --help", "Display help for command")
    .showHelpAfterError()
    .option("--root <path>", "Root directory of the Astro project (default: current working directory)")
    .option("--strict", "Treat warnings as errors")
    .option("--json", "Output machine-readable diagnostics")
    .option("--quiet", "Minimal output")
    .option("--help-ai", "Display AI workflow guidance")
    .action(async (options) => {
      if (options.helpAi) {
        printHelpAi();
        process.exitCode = 0;
        return;
      }
      process.exitCode = await runValidate(options);
    });

  return program;
}

const version = await getPackageVersion();
const argv = process.argv.slice(2);

if (argv.length === 1 && argv[0] === "--help") {
  process.stdout.write(HELP);
  process.exit(0);
}

if (argv.some((arg) => arg === "--help-ai" || arg === "--help_ai")) {
  printHelpAi();
  process.exit(0);
}

const program = createProgram(version);

try {
  await program.parseAsync(process.argv);
} catch (error) {
  if (error instanceof CommanderError) {
    process.exit(error.exitCode === 0 ? 0 : 2);
  }

  console.error(error instanceof Error ? error.message : String(error));
  process.exit(3);
}
