---
description: Setup a structured "Learn-by-Doing" documentation system for a new project.
---

1. **Initialize Project Knowledge base**:
   - Create a folder in `c:\GitRepo\Savvy-Acumen\Docs\{project_name}`.
   - Create a `Curriculum.md` there as the master syllabus.

2. **Setup Project Repo Blueprints**:
   - Create `docs/00_Introduction.md` (What and Why).
   - Create `docs/01_Project_Blueprint.md` (Architecture/Mermaid diagrams).
   - Create `docs/index.md` linking to the syllabus in `Savvy-Acumen`.

3. **Protect the Repo**:
   - Create/Update `.gitignore` to exclude educational modules (e.g., `docs/02_*.md`, `docs/03_*.md`) while keeping them in `Savvy-Acumen`.

4. **Iterative Build & Document**:
   - For every feature/module:
     - Write the code in the project repo.
     - Write a corresponding "Spoon-feeding" markdown file in `Savvy-Acumen` that contains:
       - The code snippets.
       - A "Why this code?" section.
       - A "Potential Doubts" section.
     - Update the `Curriculum.md` in `Savvy-Acumen`.

5. **Commit & Sync**:
   - Commit code to the project repo.
   - Commit docs to the `Savvy-Acumen` repo.

----
Task: Initialize a "Learn-by-Doing" Masterclass system for project: [INSERT PROJECT NAME].

Objective: Move me from "vibe coding" to technical mastery by building a dual-repo knowledge system.

Instructions:

Dual Repository Setup:
Project Repo: Keep it clean. Only code and high-level architecture blueprints (docs/00_Intro, docs/01_Blueprint, 
docs/index.md
).
Educational Repo (Savvy-Acumen): Create a subfolder Docs/[PROJECT_NAME]. This is where all the "spoon-feeding" and "How this works" deep dives live.
Syllabus First:
Create a Curriculum.md in Savvy-Acumen/Docs/[PROJECT_NAME].
Map out the learning path in 10+ modules (Phase 1: Core, Phase 2: Logic, Phase 3: Advanced).
The .gitignore Safeguard:
Ensure the project repo's 
.gitignore
 excludes all educational modules from being pushed there, keeping it professional.
"Spoon-Feeding" Rule:
For every code block, create a corresponding module in Savvy-Acumen.
Each module MUST include:
The code snippet.
"Why this code?": Explain the logic, libraries, and architecture.
"Potential Doubts": Address common beginner questions or "vibe coding" pitfalls.
Navigation:
The project's 
docs/index.md
 must link directly to the Curriculum.md on GitHub to avoid redundancy.
Do not start coding until the syllabus and repository "pipes" are connected.