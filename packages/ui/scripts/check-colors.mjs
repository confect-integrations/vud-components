// CON-1415: fails when a hex colour shows up in the library source outside the
// theme definitions. Components must read colours from the --vud-* variables
// in src/theme.css, otherwise an app's theme cannot reach them.
//
// Allowed: src/theme.css (the variable defaults) and the white/black tokens in
// src/styles.css. Stories are demo content, not shipped, and are skipped.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g;
const ALLOWED_FILES = new Set(["theme.css"]);
const ALLOWED_LINES = { "styles.css": [/^\s*--color-(white|black):\s*#[0-9a-fA-F]+;\s*$/] };

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

const hits = [];
for (const path of walk(src)) {
  const name = relative(src, path).replaceAll("\\", "/");
  if (!/\.(tsx?|css)$/.test(name) || name.endsWith(".stories.tsx")) continue;
  if (ALLOWED_FILES.has(name)) continue;
  const allowed = ALLOWED_LINES[name] ?? [];
  readFileSync(path, "utf8")
    .split(/\r?\n/)
    .forEach((line, i) => {
      if (allowed.some((re) => re.test(line))) return;
      for (const m of line.matchAll(HEX)) hits.push(`src/${name}:${i + 1}  ${m[0]}`);
    });
}

if (hits.length) {
  console.error(
    `Hex colours outside src/theme.css (use a --vud-* variable instead):\n  ${hits.join("\n  ")}`,
  );
  process.exit(1);
}
console.log("check-colors: no hex colours outside src/theme.css");
