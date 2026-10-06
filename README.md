# Agent Skills

Reusable agent skills maintained by HuyTech.

This repository is a skill collection. The installer copies only the skill you
choose into your local skills directory.

## Skills

- `humanizer`: rewrites AI-sounding prose so it keeps the original meaning but reads like a human writer.

## Requirements

- Node.js 18 or newer
- `npx`, included with npm
- Git access to `https://github.com/huytech/agent-skills`

Check Node.js:

```powershell
node --version
```

## Install one skill

Install `humanizer` into the default location, `~/.agents/skills`:

```powershell
npx --yes github:huytech/agent-skills humanizer
```

On Windows, that default path is:

```text
C:\Users\<you>\.agents\skills\humanizer
```

## Update an existing skill

If the skill already exists, use `--force` to replace it:

```powershell
npx --yes github:huytech/agent-skills humanizer --force
```

## Install to another directory

Use `--dir` when your runtime reads skills from another folder.

Install into Codex's default skill directory:

```powershell
npx --yes github:huytech/agent-skills humanizer --dir "$env:USERPROFILE\.codex\skills"
```

Install into a custom directory:

```powershell
npx --yes github:huytech/agent-skills humanizer --dir "D:\agent-skills"
```

## List available skills

```powershell
npx --yes github:huytech/agent-skills list
```

## Command format

```powershell
npx --yes github:huytech/agent-skills <skill-name> [--force] [--dir <path>]
```

Examples:

```powershell
npx --yes github:huytech/agent-skills humanizer
npx --yes github:huytech/agent-skills install humanizer
npx --yes github:huytech/agent-skills list
```

## Add a new skill to this repo

Add each skill as its own folder under `skills/`:

```text
skills/
  humanizer/
    SKILL.md
    agents/
      openai.yaml
```

Then commit and push:

```powershell
git add skills/<skill-name>
git commit -m "feat: add <skill-name> skill"
git push
```

After pushing, install it with:

```powershell
npx --yes github:huytech/agent-skills <skill-name>
```

## Troubleshooting

If `npx` uses an old cached copy, clear the npm cache or add `--force` to the
skill install command:

```powershell
npm cache clean --force
npx --yes github:huytech/agent-skills humanizer --force
```

If installation fails because the target folder already exists, re-run with:

```powershell
npx --yes github:huytech/agent-skills humanizer --force
```
