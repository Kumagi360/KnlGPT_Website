#!/usr/bin/env node

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};
const vaultPath = valueFor("--vault");
const outputPath = valueFor("--output") || "assets/data/obsidian-graph.json";
const includeAll = args.includes("--all");

if (!vaultPath) {
  console.error("Usage: node scripts/export-obsidian-graph.mjs --vault /path/to/vault [--all] [--output assets/data/obsidian-graph.json]");
  process.exit(1);
}

async function markdownFiles(directory, isVaultRoot = false) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === ".obsidian" || (isVaultRoot && entry.name === "Private") ? [] : markdownFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  }));
  return files.flat();
}

function isPublished(markdown) {
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return Boolean(frontmatter && /^publish-graph:\s*true\s*$/im.test(frontmatter[1]));
}

function titleFor(filePath, vault) {
  return path.relative(vault, filePath).replace(/\.md$/, "").replaceAll(path.sep, "/");
}

function duplicatesParentDirectory(filePath) {
  return path.basename(filePath, ".md").toLowerCase() === path.basename(path.dirname(filePath)).toLowerCase();
}

const files = await markdownFiles(path.resolve(vaultPath), true);
const notes = await Promise.all(files.map(async (filePath) => ({ filePath, markdown: await readFile(filePath, "utf8") })));
const selected = (includeAll ? notes : notes.filter((note) => isPublished(note.markdown)))
  .filter((note) => !duplicatesParentDirectory(note.filePath));
const directories = new Set();
selected.forEach((note) => {
  let directory = path.posix.dirname(titleFor(note.filePath, vaultPath));
  while (directory !== ".") {
    directories.add(directory);
    directory = path.posix.dirname(directory);
  }
});
const nodes = [
  ...[...directories].map((directory) => ({ id: `directory:${directory}`, title: path.posix.basename(directory), type: "directory" })),
  ...selected.map((note) => {
    const id = titleFor(note.filePath, vaultPath);
    return { id: `note:${id}`, title: path.posix.basename(id), type: "note" };
  }),
];
const links = [];
directories.forEach((directory) => {
  const parent = path.posix.dirname(directory);
  if (parent !== ".") links.push({ source: `directory:${parent}`, target: `directory:${directory}` });
});
selected.forEach((note) => {
  const id = titleFor(note.filePath, vaultPath);
  const parent = path.posix.dirname(id);
  if (parent !== ".") links.push({ source: `directory:${parent}`, target: `note:${id}` });
});

const graph = { nodes, links };
const graphJson = `${JSON.stringify(graph, null, 2)}\n`;
const scriptPath = outputPath.replace(/\.json$/, ".js");

await mkdir(path.dirname(path.resolve(outputPath)), { recursive: true });
await writeFile(path.resolve(outputPath), graphJson);
await writeFile(path.resolve(scriptPath), `window.OBSIDIAN_GRAPH_DATA = ${graphJson};`);
console.log(`Exported ${nodes.length} notes and ${links.length} connections to ${outputPath}.`);
