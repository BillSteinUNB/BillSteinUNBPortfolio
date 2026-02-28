# Portfolio Redesign - ASCII/Minimal Personal Site

## TL;DR

> **Quick Summary**: Transform the existing Next.js portfolio into a clean, minimal, ASCII-inspired personal site with per-project GitHub commit timelines. Based on priyanshu.tech aesthetic but "one step up" in refinement.
>
> **Deliverables**:
> - Redesigned homepage with Tech Marquee, Projects Grid with expandable commit timelines, "Now" section, ASCII footer
> - GitHub API integration with ISR caching for per-project commits
> - Simplified contact (social links only)
> - Updated visual aesthetic (monospace fonts, clean borders, minimal color)
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: GitHub API → CommitTimeline → ProjectCard → Homepage

---

## Context

### Original Request
User wants to overhaul their portfolio for employer presentations. Current design feels unprofessional. Wants:
- Simplistic black & white ASCII-like design
- More personal projects site (less "hire me" vibe)
- Track activity via GitHub commits
- Per-project git timelines
- Reference: https://www.priyanshu.tech/ (one step up from that)

### Interview Summary
**Key Discussions**:
- Design: ASCII-inspired aesthetic, not full terminal UI. Colors allowed. Clean/minimal.
- GitHub: Per-project commit timelines, expandable on click, minimal info (hash + message)
- X/Twitter: Defer for now
- Contact: Simplify to social links, remove full form
- Sections: Add Tech Marquee, "Now" section, ASCII footer; Keep Terminal, /projects gallery
- Testing: No automated tests, agent QA only

### Metis Review
**Identified Gaps** (addressed):
- GitHub auth: Include GITHUB_TOKEN setup with unauth fallback
- Loading strategy: Lazy-load commits on expand (not prefetch)
- Commits: 10 per project, first line only, hash links to GitHub
- Graceful degradation for missing/invalid repos
- Reduced motion support for animations

---

## Work Objectives

### Core Objective
Transform portfolio into a personal lab/showcase site with live GitHub activity, clean ASCII-inspired aesthetic, and minimal "hire me" energy.

### Concrete Deliverables
- New homepage layout: Hero → Tech Marquee → Projects → Now → Footer
- CommitTimeline component (expandable, lazy-loaded)
- GitHub API route with ISR caching
- TechMarquee component (infinite scroll)
- NowSection component
- ASCIIFooter component
- Updated Project type with repo mapping
- Simplified contact (social links in footer)

### Definition of Done
- [ ] `npm run build` succeeds with zero TypeScript errors
- [ ] `npm run start` serves all routes without errors
- [ ] Homepage shows: Hero, Tech Marquee, Projects with timelines, Now section, ASCII footer
- [ ] Project cards expand to show GitHub commits (when repo configured)
- [ ] All existing routes work (/projects, /api/contact)

### Must Have
- Per-project GitHub commit timelines (expandable)
- Tech stack marquee animation
- ASCII footer with git signature
- "Now" section for current focus
- Clean, minimal visual design
- Graceful fallback when GitHub unavailable

### Must NOT Have (Guardrails)
- Full terminal UI (no fake prompts everywhere, no CRT effects)
- X/Twitter integration
- Contact form (use social links only)
- CMS/blog setup
- GitHub analytics graphs/calendars
- Client-side GitHub API calls (must be server-side)
- NEXT_PUBLIC_ secrets for GitHub token

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: N/A (not adding tests)
- **Automated tests**: None
- **Framework**: N/A
- **Agent-Executed QA**: All tasks verified by running and inspecting

### QA Policy
Every task includes agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **API/Backend**: Use Bash (curl) — Send requests, assert status + response fields
- **Build/Runtime**: Use Bash — Build, start server, curl routes

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation - Data Layer):
├── Task 1: Update Project type with GitHub repo fields [quick]
├── Task 2: Create GitHub API utility with caching [quick]
└── Task 3: Create /api/github/commits route [quick]

Wave 2 (Components - UI Building Blocks):
├── Task 4: Create TechMarquee component [quick]
├── Task 5: Create CommitTimeline component [quick]
├── Task 6: Update ProjectCard with expandable timeline [unspecified-high]
├── Task 7: Create NowSection component [quick]
└── Task 8: Create ASCIIFooter component [quick]

Wave 3 (Page Structure - Assembly):
├── Task 9: Redesign Hero section [visual-engineering]
├── Task 10: Rebuild homepage layout [unspecified-high]
├── Task 11: Update global styles for ASCII aesthetic [visual-engineering]
└── Task 12: Remove contact form, add social links to footer [quick]

Wave 4 (Integration & Polish):
├── Task 13: Wire GitHub data to project cards [unspecified-high]
├── Task 14: Add reduced motion support [quick]
└── Task 15: Final integration and route verification [deep]

Wave FINAL (Verification):
├── Task F1: Plan compliance audit [oracle]
├── Task F2: Code quality review [unspecified-high]
├── Task F3: Manual QA with Playwright [unspecified-high]
└── Task F4: Scope fidelity check [deep]
```

### Dependency Matrix

- **1**: — — 2, 3
- **2**: 1 — 3, 6, 13
- **3**: 1, 2 — 6, 13
- **4**: — — 10
- **5**: — — 6
- **6**: 3, 5 — 10, 13
- **7**: — — 10
- **8**: — — 10, 12
- **9**: — — 10
- **10**: 4, 6, 7, 8, 9 — 15
- **11**: — — 10, 15
- **12**: 8 — 15
- **13**: 2, 3, 6 — 15
- **14**: 4, 10 — 15
- **15**: 10, 11, 12, 13, 14 — F1-F4

### Agent Dispatch Summary

- **Wave 1**: 3 tasks → `quick`
- **Wave 2**: 5 tasks → T4-T5, T7-T8 → `quick`, T6 → `unspecified-high`
- **Wave 3**: 4 tasks → T9, T11 → `visual-engineering`, T10 → `unspecified-high`, T12 → `quick`
- **Wave 4**: 3 tasks → T13 → `unspecified-high`, T14 → `quick`, T15 → `deep`
- **FINAL**: 4 tasks → F1 → `oracle`, F2-F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

### Wave 1: Foundation (Data Layer)

- [x] 1. Update Project Type with GitHub Repo Fields
  **What**: Add `githubRepo?: { owner: string; name: string }` to Project type, update PROJECTS with placeholder repos
  **Files**: `types/index.ts`, `lib/constants.ts`
  **QA**: `npx tsc --noEmit` passes
  **Category**: `quick`

- [x] 2. Create GitHub API Utility with Caching
  **What**: Create `lib/github.ts` with `fetchRepoCommits()`, ISR cache (5 min), error handling, message truncation
  **Files**: `lib/github.ts`
  **QA**: Test with vercel/next.js repo, returns shaped data
  **Category**: `quick`

- [x] 3. Create /api/github/commits API Route
  **What**: Create route accepting `repo` and `limit` params, returns JSON commits
  **Files**: `app/api/github/commits/route.ts`
  **QA**: curl returns JSON array, handles 400/404/500
  **Category**: `quick`

### Wave 2: Components (UI Building Blocks)

- [x] 4. Create TechMarquee Component
  **What**: Horizontal infinite-scroll tech list with CSS animation, monospace styling
  **Files**: `components/ui/TechMarquee.tsx`
  **QA**: Playwright confirms animation running
  **Category**: `quick`

- [x] 5. Create CommitTimeline Component
  **What**: Client component fetching commits on mount, loading state, terminal-style formatting
  **Files**: `components/ui/CommitTimeline.tsx`
  **QA**: Loads commits, handles empty/error states
  **Category**: `quick`

- [x] 6. Update ProjectCard with Expandable Timeline
  **What**: Add expand/collapse button, lazy-load CommitTimeline, aria-expanded for a11y
  **Files**: `components/ui/Card.tsx` or new `components/ui/ProjectCard.tsx`
  **QA**: Card expands, shows timeline; no expand button without repo
  **Category**: `unspecified-high`

- [x] 7. Create NowSection Component
  **What**: Show current focus/learning priorities, simple text layout, placeholder content
  **Files**: `components/sections/NowSection.tsx`
  **QA**: Renders with sample data
  **Category**: `quick`

- [x] 8. Create ASCIIFooter Component
  **What**: ASCII art, social links, git commit signature, minimal layout
  **Files**: `components/layout/ASCIIFooter.tsx`
  **QA**: All elements visible, links work
  **Category**: `quick`

### Wave 3: Page Structure (Assembly)

- [x] 9. Redesign Hero Section
  **What**: Simpler personal bio, remove corporate feel, keep profile image, minimal CTAs
  **Files**: `components/sections/Hero.tsx`
  **QA**: Clean hero with personal intro
  **Category**: `visual-engineering`
  **Skills**: `frontend-ui-ux`

- [x] 10. Rebuild Homepage Layout
  **What**: New order: Hero → TechMarquee → Projects → NowSection → ASCIIFooter. Remove Skills/Experience/Contact sections.
  **Files**: `app/page.tsx`
  **QA**: All sections in order, old sections gone
  **Category**: `unspecified-high`

- [x] 11. Update Global Styles for ASCII Aesthetic
  **What**: Monospace font primary, brutalist colors, terminal utility classes, keep dark mode
  **Files**: `styles/globals.css`, `tailwind.config.ts`
  **QA**: Monospace font applied
  **Category**: `visual-engineering`
  **Skills**: `frontend-ui-ux`

- [x] 12. Remove Contact Form, Add Social Links to Footer
  **What**: Remove Contact section, ensure socials in footer, keep /api/contact route
  **Files**: `app/page.tsx`, `components/layout/ASCIIFooter.tsx`
  **QA**: No Contact section, footer has social links
  **Category**: `quick`

### Wave 4: Integration & Polish

- [x] 13. Wire GitHub Data to Project Cards
  **What**: Test real repos (bettingDashboard, Boring-App), verify lazy loading, handle rate limits
  **Files**: Multiple
  **QA**: Real commits load, graceful error handling
  **Category**: `unspecified-high`

- [x] 14. Add Reduced Motion Support
  **What**: `prefers-reduced-motion` media query, pause marquee, keep expand/collapse functional
  **Files**: `styles/globals.css`, `components/ui/TechMarquee.tsx`
  **QA**: Marquee pauses with reduced motion enabled
  **Category**: `quick`

- [x] 15. Final Integration and Route Verification
  **What**: Full build, production server, verify all routes, test mobile
  **Files**: All
  **QA**: Build succeeds, all routes 200, mobile works
  **Category**: `deep`

---

## Final Verification Wave

### F1. Plan Compliance Audit — `oracle`
Read plan end-to-end. Verify each "Must Have" exists. Check each "Must NOT Have" is absent. Verify evidence files in .sisyphus/evidence/. Compare deliverables against plan.
**Output**: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

### F2. Code Quality Review — `unspecified-high`
Run `npm run build` + `npm run lint`. Review changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod. Check AI slop patterns.
**Output**: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

### F3. Manual QA — `unspecified-high` (+ `playwright` skill)
Start server. Verify homepage shows all sections. Test project card expand/collapse. Verify commit loading. Check mobile layout. Capture screenshots.
**Output**: `Scenarios [N/N pass] | Screenshots [N captured] | VERDICT`

### F4. Scope Fidelity Check — `deep`
Compare each task spec to actual implementation. Verify no scope creep. Check for unaccounted changes.
**Output**: `Tasks [N/N compliant] | Creep [CLEAN/N items] | VERDICT`

---

## Commit Strategy

Group related tasks into logical commits:
1. `feat(data): add GitHub repo fields to Project type and API utility`
2. `feat(ui): add TechMarquee, CommitTimeline, NowSection, ASCIIFooter components`
3. `feat(ui): update ProjectCard with expandable commit timeline`
4. `refactor(home): redesign homepage with new sections and ASCII aesthetic`
5. `refactor(contact): simplify to social links only`
6. `feat(a11y): add reduced motion support`

---

## Success Criteria

### Verification Commands
```bash
npm run build           # Expected: Build succeeds
npm run start &         # Start server
curl -s http://localhost:3000/ | grep -i "now"           # Has Now section
curl -s http://localhost:3000/ | grep -i "projects"      # Has Projects
curl -s http://localhost:3000/projects | head -n 1       # /projects works
curl -s "http://localhost:3000/api/github/commits?repo=BillSteinUNB/bettingDashboard&limit=5" | jq '.[0].sha'  # API works
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] Build succeeds
- [ ] All routes accessible
- [ ] GitHub commits load on project cards
- [ ] ASCII footer displays correctly
- [ ] Tech marquee animates
- [ ] Mobile layout works
