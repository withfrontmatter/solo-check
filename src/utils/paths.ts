import path from "node:path";

export function resolveRoot(root?: string): string {
  return path.resolve(process.cwd(), root ?? ".");
}
