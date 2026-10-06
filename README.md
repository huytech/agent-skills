# Agent Skills

Reusable Codex skills maintained by HuyTech.

## Skills

- `humanizer`: rewrites AI-sounding prose so it keeps the original meaning but reads like a human writer.

## Install

Install a skill with `npx`:

```powershell
npx github:huytech/agent-skills humanizer
```

By default, the installer copies skills into `~/.agents/skills`.

Useful commands:

```powershell
npx github:huytech/agent-skills list
npx github:huytech/agent-skills humanizer --force
npx github:huytech/agent-skills humanizer --dir "$env:USERPROFILE\.codex\skills"
```
