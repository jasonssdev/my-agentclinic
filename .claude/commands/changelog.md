Update CHANGELOG.md from git history.

1. Run `git log --pretty=format:"%ad|||%s|||%H" --date=short` to get all commits.
2. Read the current `CHANGELOG.md` from the project root.
3. Group commits by date (YYYY-MM-DD). Skip merge commits (subjects starting with "merge ").
4. For each date not already present as a heading in CHANGELOG.md, prepend a new section at the top (below the `# Changelog` heading) in this format:

```
## YYYY-MM-DD

- <commit subject>
- <commit subject>
```

   Dates already in CHANGELOG.md are left exactly as-is — do not re-add or duplicate their entries.
5. Write the updated file. Do not reformat or reorder existing sections.
