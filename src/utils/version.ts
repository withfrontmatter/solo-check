import fs from "node:fs/promises";

export async function getPackageVersion(): Promise<string> {
  const packageJsonUrl = new URL("../package.json", import.meta.url);
  const raw = await fs.readFile(packageJsonUrl, "utf8");
  const value = JSON.parse(raw) as { version?: string };
  return value.version ?? "0.0.0";
}
