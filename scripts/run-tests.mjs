#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const testsDir = path.join(rootDir, "tests", "convex");
const convexTestFiles = readdirSync(testsDir)
  .filter((file) => file.endsWith(".test.mts"))
  .map((file) => path.join("tests", "convex", file));

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    cwd: rootDir,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (convexTestFiles.length === 0) {
  console.error("No convex test files found.");
  process.exit(1);
}

const testArgs = ["--test", ...convexTestFiles];
const tsxBin = path.join(rootDir, "node_modules", "tsx", "dist", "cli.mjs");

if (existsSync(tsxBin)) {
  run(process.execPath, [tsxBin, ...testArgs]);
} else {
  run("npx", ["--yes", "tsx", ...testArgs]);
}
