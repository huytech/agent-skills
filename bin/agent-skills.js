#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const skillsRoot = path.join(repoRoot, "skills");

function usage() {
  console.log(`Usage:
  npx github:huytech/agent-skills <skill-name>
  npx github:huytech/agent-skills install <skill-name>
  npx github:huytech/agent-skills list

Options:
  --dir <path>       Install destination. Defaults to ~/.agents/skills
  --force            Replace an existing installed skill

Examples:
  npx github:huytech/agent-skills humanizer
  npx github:huytech/agent-skills install humanizer --force
  npx github:huytech/agent-skills humanizer --dir "$env:USERPROFILE\\.codex\\skills"
`);
}

function defaultInstallDir() {
  return path.join(os.homedir(), ".agents", "skills");
}

function parseArgs(argv) {
  const result = {
    command: "install",
    skill: null,
    dir: defaultInstallDir(),
    force: false,
  };

  const args = [...argv];
  if (args[0] === "install" || args[0] === "list" || args[0] === "help") {
    result.command = args.shift();
  }

  while (args.length > 0) {
    const arg = args.shift();
    if (arg === "--dir") {
      const value = args.shift();
      if (!value) throw new Error("--dir requires a path");
      result.dir = path.resolve(value);
    } else if (arg === "--force") {
      result.force = true;
    } else if (!result.skill) {
      result.skill = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  return result;
}

function listSkills() {
  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function installSkill(skillName, installDir, force) {
  const available = listSkills();
  if (!available.includes(skillName)) {
    throw new Error(
      `Unknown skill "${skillName}". Available skills: ${available.join(", ")}`
    );
  }

  const source = path.join(skillsRoot, skillName);
  const target = path.join(installDir, skillName);

  if (fs.existsSync(target)) {
    if (!force) {
      throw new Error(
        `${target} already exists. Re-run with --force to replace it.`
      );
    }
    fs.rmSync(target, { recursive: true, force: true });
  }

  fs.mkdirSync(installDir, { recursive: true });
  fs.cpSync(source, target, { recursive: true });
  console.log(`Installed ${skillName} to ${target}`);
}

try {
  const options = parseArgs(process.argv.slice(2));

  if (options.command === "help") {
    usage();
  } else if (options.command === "list") {
    console.log(listSkills().join("\n"));
  } else {
    if (!options.skill) {
      usage();
      process.exitCode = 1;
    } else {
      installSkill(options.skill, options.dir, options.force);
    }
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}

