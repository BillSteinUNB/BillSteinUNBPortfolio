# Portfolio Redesign - Learnings

## GitHub API Utility (lib/github.ts)

### Patterns & Conventions
- **ISR Caching:** Use `next: { revalidate: 300 }` for 5-minute cache revalidation in Next.js fetch
- **Error Handling:** Return empty array instead of throwing - safer for client code that might not expect exceptions
- **Message Formatting:** GitHub API commit messages include newlines; always split and take first line, truncate to 72 chars (conventional commit standard)
- **Rate Limits:** GITHUB_TOKEN from process.env allows 5000 req/hr instead of 60 req/hr - useful for data-heavy features
- **TypeScript Pattern:** Export both function and return interface for better type inference in consuming code

### Implementation Details
- GitHub API endpoint: `GET /repos/{owner}/{repo}/commits?per_page={limit}`
- Optional token header: `Authorization: token {GITHUB_TOKEN}`
- Accept header: `application/vnd.github.v3+json` (explicit versioning)
- Response is paginated array - must slice to requested limit
- Safe null handling with optional chaining on nested properties

### Gotchas Avoided
- Did NOT use NEXT_PUBLIC_ prefix for token (security risk - would expose in browser)
- Did NOT throw errors - wrapped in try/catch with empty array fallback
- Did NOT include author.login (can be null/undefined in responses)
- Did NOT implement per-user caching (these are public repos)


## Project Type Enhancement (types/index.ts + lib/constants.ts)

### Completed
- Added optional `githubRepo?: { owner: string; name: string }` field to Project interface in `types/index.ts`
- Updated PROJECTS array in `lib/constants.ts` with githubRepo values for projects with GitHub repos:
  - **GymMark**: `{ owner: "BillSteinUNB", name: "gymmark" }`
  - **Betting Dashboard**: `{ owner: "BillSteinUNB", name: "bettingDashboard" }`
  - **The Boring App**: `{ owner: "BillSteinUNB", name: "Boring-App" }`
  - **Frontend Showcase**: No githubRepo field (gallery project, intentional)

### Verification
- TypeScript type check passed: `npx tsc --noEmit` returned zero errors
- All existing fields preserved intact
- githubRepo field properly optional, not breaking existing code

### Design Notes
- Simple structure: owner + repo name allows flexible GitHub API integration
- Optional field means backward compatible with existing project data
- Ready to support future GitHub stats integration (stars, forks, activity feeds)

## GitHub Commits API Route (app/api/github/commits/route.ts)

### Completed
- Created GET endpoint at `/api/github/commits`
- Query params: `repo` (required, format: "owner/name"), `limit` (optional, default: 10, max: 20)
- Returns JSON array of GitHubCommit objects
- Proper error handling: 400 for invalid params, 404 for not found, 500 for server errors

### Implementation Pattern
- Imported `fetchRepoCommits` and `GitHubCommit` type from `@/lib/github`
- Used NextResponse.json() for all responses (matches contact route pattern)
- Query param validation: parse repo string with split("/"), validate 2 parts with content
- Limit parsing: parseInt with NaN check, default to 10, cap at 20 with Math.min()
- Development-only console.error logging (matches contact route pattern)

### Error Handling Strategy
- 400: Missing/invalid repo param (checked twice - existence and format)
- 400: Invalid limit param (non-numeric or less than 1)
- 404: Repository not found or empty (uses test fetch with limit=1 to differentiate)
- 500: Catch-all for unexpected errors

### Security Considerations
- Does NOT expose GITHUB_TOKEN in responses
- Does NOT allow arbitrary API calls (only commits endpoint)
- Parameter validation prevents injection
- fetchRepoCommits already handles auth token safely (not exposed)

### Verified
- TypeScript compilation: zero diagnostics/errors
- File created at exact path: `app/api/github/commits/route.ts`
- Imports resolve correctly
- API contract matches specification

## TechMarquee Component (components/ui/TechMarquee.tsx)

### Completed
- Created `TechMarquee.tsx` with infinite horizontal scroll animation
- Uses CSS @keyframes for smooth, performant animation (no JavaScript)
- Content automatically duplicated for seamless loop
- Respects `prefers-reduced-motion` media query for accessibility
- Monospace font styling with ASCII-inspired aesthetic
- Configurable separator (default: `//` for terminal feel)
- Optional speed prop (`slow` / `normal` / `fast`)
- Includes fade-out gradients at edges for visual polish
- Client component with `'use client'` directive

### Implementation Pattern
- Extends `HTMLAttributes<HTMLDivElement>` for standard DOM compatibility
- Uses `cn()` utility from `@/lib/utils` (consistent with other UI components)
- Inline `<style>` tag with @keyframes (keeps animation logic co-located with component)
- Duplicate marquee content rendered with `aria-hidden="true"` (second copy invisible to screen readers)
- Speed variations: slow=40s, normal=30s, fast=20s animation duration

### Design Decisions
- **CSS-only animation**: No JavaScript dependencies, better performance
- **Seamless loop**: Content duplicated exactly, prevents visual jump at loop
- **Fade edges**: Gradient overlays left/right prevent harsh cutoff (visual polish)
- **Monospace font**: `font-mono` + `text-foreground/80` aligns with ASCII/terminal aesthetic
- **Separator flexibility**: Customizable via prop, defaults to `//` for dev/terminal feel
- **Accessibility**: Respects motion preferences, uses `aria-hidden` for duplicate content
- **Styling approach**: Inline styles for animation (can't be overridden in CSS modules), Tailwind for structure

### Verified
- TypeScript compilation: zero diagnostics
- Component follows existing UI library conventions (Badge.tsx pattern)
- Props interface properly extends HTMLAttributes
- Ready to accept `technologies: string[]` prop from parent components

## NowSection Component (components/sections/NowSection.tsx)

### Completed
- Created NowSection component following established section pattern
- Accepts `focus: { year: number; items: string[] }` prop
- Terminal-style UI with monospace font and inline animation
- Implements Framer Motion animations with reduced motion support
- Zero TypeScript errors

### Design Decisions
- **Terminal Aesthetic**: Monospace font, `$ focus` prompt header with blinking cursor
- **Animation Pattern**: Staggered reveal with slide-in from left (matches Skills component style)
- **Simple Focus**: Text-only layout, no complex UI elements
- **Accessibility**: Respects `prefers-reduced-motion` user preference
- **Structure**: Uses same section container pattern as About, Skills, Experience

### Implementation Details
- Uses `useInView` for scroll-triggered animations
- Motion variants consistent with other sections (0.6s duration)
- Bullet point items with 0.1s stagger delay between them
- Terminal-style divider line under header
- Responsive padding: p-6 on mobile, p-8 on desktop

### Placeholder Content Pattern
Component accepts prop structure ready for user to populate:
```typescript
focus: {
  year: 2026,
  items: [
    "Mastering TypeScript and React patterns",
    "Building side projects with Next.js",
    "Exploring AI/ML integration",
    "PLACEHOLDER: Add your current focus items"
  ]
}
```

### Next Steps
- Import and integrate into main page/layout
- Populate with actual focus data (user configurable)
- Test scroll animations in browser

## CommitTimeline Component (components/ui/CommitTimeline.tsx)

### Implementation Complete
- Created client component (`"use client"`) for lazy-loaded commit fetching
- Fetches on mount using `useEffect` with proper dependency array
- Accepts `repo: { owner: string; name: string }` prop
- Uses `/api/github/commits` endpoint with query params: `repo` (format: "owner/name") and `limit: 10`

### Features Implemented
- **Loading State**: Animated pulsing dot with "Loading commits..." text (matches skeleton pattern)
- **Error State**: Destructive red box with warning icon (⚠) and error message
- **Empty State**: Terminal-style message "— No recent activity"
- **Commit Display**: Monospace terminal styling with:
  - 7-character commit hash (clickable link to GitHub)
  - Terminal separator "•" between hash and message
  - Truncated message (max 50 chars, adds "..." if needed)
  - Alternating visual hierarchy (lighter odd rows)
  - Hover states: highlight row with accent background, underline hash link

### Styling Approach
- Terminal aesthetic: `font-mono`, muted colors, minimal borders
- Timeline indicator: Small primary-colored dot for visual depth
- Hover effects: Row highlight + link underline for discoverability
- Color strategy: Alternating foreground/muted-foreground for rhythm
- Responsive: Flex layout with proper gap spacing

### Type Safety
- Imported `GitHubCommit` interface from `@/lib/github`
- Defined `CommitTimelineProps` interface for repo prop validation
- No type errors in LSP diagnostics

### Network & State Management
- Dependencies: `[repo.owner, repo.name]` - refetches if repo changes
- Error handling: Catches fetch errors, status errors, invalid JSON
- Loading/error/data states mutually exclusive
- No refetch on every render (useEffect only runs on mount and repo change)

### Verified
- Build passes: `npm run build` succeeds
- TypeScript: Zero diagnostics
- Component follows Next.js/React patterns from existing codebase
- Terminal styling matches portfolio's interactive terminal aesthetic

## ASCIIFooter Component (components/layout/ASCIIFooter.tsx)

### Completed
- Created `ASCIIFooter.tsx` with terminal/monospace aesthetic
- Includes ASCII art cat (scaled to fit mobile, uses `overflow-x-auto` for safety)
- Social links mapped from `SOCIAL_LINKS` constant
- Email link generated from `EMAIL` constant
- Git commit signature with blinking cursor: `➜ ~ git commit -m "bye" _`
- Responsive design (stacks vertically on mobile, horizontal on sm+)
- Proper accessibility: aria-labels on all links

### Design Decisions
- **Font:** `font-mono` (monospace/terminal style) for cohesion with terminal theme
- **Colors:** Uses theme system (text-muted-foreground, text-foreground for consistency)
- **Mobile-Safe ASCII:** Minimal art (3 lines), uses `overflow-x-auto` for overflow handling
- **Visual Details:** 
  - Dotted underlines on links (decoration-dotted)
  - Backdrop blur on footer (bg-background/50 backdrop-blur-sm)
  - Separator border between ASCII art, links, and git signature
  - Animated cursor pulse on blinking underscore
- **Spacing:** Tailwind utility classes (py-8 md:py-12, gap-6) for clean vertical rhythm

### Technical Details
- Uses Next.js `Link` component for client-side navigation
- Imports constants directly: `SOCIAL_LINKS, EMAIL` from `@/lib/constants`
- TypeScript: No diagnostics, fully type-safe
- Compatible with existing Footer component (parallel, not replacement)

### Verification
- TypeScript: zero diagnostics
- Git commit: `6651658` successfully created
- File path: `components/layout/ASCIIFooter.tsx` ✓

## ProjectCard Component (components/ui/ProjectCard.tsx)

### Completed
- Created `ProjectCard.tsx` extracting card rendering from Portfolio.tsx
- Added expand/collapse button for projects with `githubRepo` field
- Lazy-loads CommitTimeline: only mounts after first expand click, stays mounted to preserve data
- Uses CSS grid row animation (`grid-rows-[0fr]` → `grid-rows-[1fr]`) for smooth height transitions
- Moved CyclingImage, statusConfig, getDemoIcon from Portfolio.tsx into ProjectCard
- Updated Portfolio.tsx to use ProjectCard (66 lines, down from 200)

### Design Decisions
- **Lazy load strategy**: Two-state approach (`expanded` + `loaded`). `loaded` goes true on first expand and never resets, keeping CommitTimeline mounted to preserve fetched data across collapse/expand cycles
- **CSS grid animation**: Using `grid-rows-[0fr/1fr]` instead of max-height hack — smoother, no need to guess content height
- **ASCII aesthetic**: Expand button styled as terminal command (`$ git log --oneline`) with dashed border, monospace font
- **Timeline container**: Dashed border box with ASCII header decoration (`┌─ recent activity ─┐`)
- **Type flexibility**: Used `readonly` throughout ProjectData type to accept `as const` PROJECTS items without spread/cast
- **Backward compatible**: Cards without `githubRepo` render identically to before (no expand button shown)

### Accessibility
- `aria-expanded` on toggle button
- `aria-controls` linking button to timeline region
- `role="region"` with `aria-label` on timeline container
- Native `<button>` element handles Enter/Space keyboard activation
- `focus-visible` ring styling for keyboard navigation

### Verified
- TypeScript: zero diagnostics on both files
- Build: `npm run build` passes cleanly
- Portfolio.tsx reduced from 200 → 66 lines (all card logic in ProjectCard)

## Contact Section Removal (Task 9)

### Completed
- Removed Contact import from `app/page.tsx` (line 6)
- Removed Contact component usage from homepage (line 16)
- Kept `/api/contact/route.ts` intact (still functional, just not linked from UI)
- Kept `components/sections/Contact.tsx` unchanged (available for future use)

### Social Links Verification
- ✅ ASCIIFooter already has social links (GitHub, LinkedIn, Email)
- ✅ Links properly mapped from SOCIAL_LINKS constant
- ✅ Email link generated from EMAIL constant
- ✅ Responsive and accessible with aria-labels

### Homepage Structure After
```tsx
// app/page.tsx - now 5 sections instead of 6
<>
  <Hero />
  <About />
  <Skills />
  <Portfolio />
  <Experience />
</>
```

### Build Verification
- ✅ TypeScript compilation: zero errors
- ✅ Build: `npm run build` passes successfully
- ✅ All routes still accessible (API endpoints remain functional)
- ✅ First Load JS remains optimal (156 kB for homepage)

### Design Impact
- Cleaner homepage flow (removed form section)
- Contact information accessible via footer social links
- Email contact still available as constant in footer
- Terminal aesthetic maintained throughout


300#NX|
## Hero Section Redesign (Task 10)

### Completed
- Redesigned `components/sections/Hero.tsx` with personal, human feel
- Replaced corporate "hire me" energy with conversational bio
- Reduced CTAs from 3 buttons to 1 primary button + inline social links
- Added terminal-style `$ whoami` tagline with blinking cursor
- Added subtle grid background pattern for visual depth
- Kept profile image with improved hover effects

### Design Decisions
- **Personal Bio**: Conversational tone ("I genuinely enjoy building things") vs corporate speak
- **Terminal Aesthetic**: `$ whoami // developer, builder, problem-solver` with blinking cursor
- **Minimal CTAs**: Single "View my work" button + inline GitHub/LinkedIn icons
- **Removed**: "Download Resume", "Contact Me" buttons (too corporate)
- **Scroll Indicator**: Made more subtle (40% opacity)
- **Background**: Added subtle 48px grid pattern for visual texture

### Animation Changes
- Stagger delay reduced: 0.2s → 0.15s (snappier feel)
- Added custom easing: `[0.25, 0.46, 0.45, 0.94]` (smooth deceleration)
- Duration increased: 0.5s for more graceful entrance
- Profile image: Added hover scale effect (scale-105)

### Verified
- TypeScript: zero diagnostics
- Build: `npm run build` passes cleanly
- Homepage size: 10.5 kB (unchanged)
- All animations respect reduced-motion preferences




## Global Styles ASCII Aesthetic Update (styles/globals.css + tailwind.config.ts + app/layout.tsx)

### Completed
- Replaced Inter font with JetBrains Mono (Google Fonts)
- Updated CSS variables for brutalist/terminal aesthetic:
  - Light mode: Off-white paper background (98%), near-black text (5%)
  - Dark mode: Deep charcoal (7%), off-white text (92%)
  - Terminal green primary: `142 76% 36%` (light), `142 70% 45%` (dark)
  - Minimal border-radius: `0.125rem` (almost square)
- Added ASCII-specific CSS variables:
  - `--terminal-green`, `--terminal-amber`, `--terminal-red`, `--terminal-blue`
  - `--ascii-border` for dashed borders
  - `--code-bg` for code blocks
- Created utility classes in `@layer components`:
  - `.terminal-text` - Primary colored mono text
  - `.ascii-border` - Dashed border with proper color
  - `.ascii-box` - Box with corner `+` decorations
  - `.terminal-prompt` - Green prompt with `$ ` prefix
  - `.cursor-blink` - Blinking cursor animation
  - `.code-block` / `.inline-code` - Code styling
  - `.ascii-divider` - Dashed line with center content
  - `.status-success/warning/error` - Status indicators
  - `.terminal-link` - Blue dotted underline links
  - `.ascii-table` - Table with dashed headers
- Added `.scanlines` effect (optional, for terminal sections)
- Updated scrollbar styling (square corners for brutalist)
- Added text selection styling (primary color with transparency)

### Tailwind Config Updates
- Extended `fontFamily` with `mono` and `terminal` stacks
- Added `terminal` colors object (green, amber, red, blue)
- Added `ascii` and `code` color objects
- Added `borderWidth['3']` for 3px borders
- Added cursor animations to `animation`/`keyframes`

### Layout.tsx Updates
- Changed from `Inter` to `JetBrains_Mono` font import
- Added CSS variable `--font-jetbrains` for Tailwind integration
- Body uses `font-mono antialiased` classes

### Font Stack
Primary: JetBrains Mono → ui-monospace → SF Mono → Fira Code → Cascadia Code → Consolas → monospace
- Ligatures enabled: `font-feature-settings: 'liga' 1, 'calt' 1`
- Letter-spacing: `-0.01em` (tighter for monospace)
- Line-height: `1.6` (better readability)

### Verified
- TypeScript: zero diagnostics
- Build: `npm run build` passes cleanly
- Dark mode variables preserved and functional
