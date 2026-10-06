# Agent Skills

Reusable Codex skills maintained by HuyTech.

## Skills

- `humanizer`: rewrites AI-sounding prose so it keeps the original meaning but reads like a human writer.

## Install

Copy a skill folder into your Codex skills directory:

```powershell
Copy-Item -Recurse .\skills\humanizer "$env:USERPROFILE\.codex\skills\humanizer"
```

If you use `CODEX_HOME`, copy into `$env:CODEX_HOME\skills` instead.

