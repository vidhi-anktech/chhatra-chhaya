# Contributing to Chhatra Chhaya (छत्र छाया)

Welcome to the **Chhatra Chhaya** project repository! This guide outlines our Git architecture, branch strategy, and contribution workflow.

---

## 🌳 Branching Strategy

We follow a structured Gitflow model with the following branch roles:

```
main (Production Releases)
  │
  └─── develop (Integration / Pre-Release)
         │
         ├─── feature/<feature-name> (Active Feature Development)
         ├─── bugfix/<issue-name>    (Bug Fixes)
         └─── hotfix/<patch-name>    (Urgent Production Fixes directly to main & develop)
```

### 1. `main`
- **Role:** Production-ready code only.
- **Rules:** 
  - Protected branch.
  - Direct commits are prohibited.
  - Releases are tagged with semantic versioning (e.g. `v1.0.0`).
  - Merges into `main` originate only from `develop` (or `hotfix/*`).

### 2. `develop`
- **Role:** Main integration branch for upcoming releases.
- **Rules:**
  - Contains completed features that have been tested.
  - Pull Requests from `feature/*` branches target `develop`.
  - Serves as the base branch for creating new feature branches.

### 3. `feature/*` or `feature`
- **Role:** All active development, screen building, and logic changes.
- **Naming Convention:**
  - `feature/<feature-description>` (e.g., `feature/vihar-live-tracking`, `feature/audio-player-enhancements`)
- **Rules:**
  - Branch off from `develop`.
  - Once tested, submit a Pull Request to merge back into `develop`.

---

## 🚀 Contribution Workflow

1. **Pull the latest `develop` branch:**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create a new feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes, test locally, and commit:**
   ```bash
   git add .
   git commit -m "feat(module): descriptive message"
   ```

4. **Push your feature branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request (PR):**
   - Base branch: `develop`
   - Compare branch: `feature/your-feature-name`
   - Fill out PR description and link relevant issues.

---

## 📝 Commit Conventions

We follow Conventional Commits:
- `feat:` A new feature or screen
- `fix:` A bug fix
- `docs:` Documentation updates
- `style:` Formatting, UI style tweaks
- `refactor:` Code restructuring without functional changes
- `chore:` Dependency updates, configuration, or tool adjustments
