# Pawn Playground — Project Context & Engineering Standards

## Business & Conversion Goal
- **Brand:** Pawn Playground Chess Academy (Shah Alam, Selangor, Malaysia)
- **Primary Conversion Action:** Convert website visitors (parents & adult learners) directly into pre-filled WhatsApp inquiries. Never route users to dead-end email forms.
- **Target Audience:** Malaysian parents seeking MSSD/school chess coaching for kids, plus adult beginners.

## Tech Stack & Architecture
- **Core Stack:** Static HTML5, CSS3, Vanilla JavaScript (ES6+). Keep zero heavy build dependencies so it deploys cleanly on GitHub Pages (`https://iskandarooo.github.io/pawn-playground`).
- **Styling:** Clean, modern responsive design (mobile-first, as 80%+ of Malaysian parents browse via WhatsApp/mobile links). Use CSS variables for colors and spacing.
- **UI/UX Rules:**
  - Every interactive tool or program card must end with a clear, high-contrast WhatsApp CTA button.
  - Display pricing and formats clearly for Malaysian users (RM currency, Online vs. Shah Alam/Klang Valley physical options).

## WhatsApp Lead Routing Spec
- **Phone Number:** `60196120403`
- **Message Format:** Encode URI components (`encodeURIComponent`) so clicking any CTA opens `https://wa.me/60196120403?text=...` with the student's selected program, age group, and skill level pre-populated.

## Coding Conventions
- Keep JavaScript modular inside `/js/` and stylesheets organized inside `/css/`.
- Ensure all interactive widgets (quizzes, pairing generators, calculators) run 100% client-side with zero backend API requirements.
- Write clean, semantic HTML with accessible labels and fast load times.

## Visual Design System (Modern Line-Art & Geometric Academy Aesthetic)
- **Aesthetic Direction:** Crisp, approachable, modern youth & competitive chess academy tailored to the Pawn Playground line-art logo (monochrome line-art + geometric wordmark). Clean white space, 1px hairline borders, zero heavy shadows or dated serifs.
- **Color Palette (CSS Variables):**
  - `--bg-primary: #FFFFFF` (Pure Crisp White)
  - `--bg-secondary: #F6F6F4` (Soft Warm Stone)
  - `--brand-primary: #18181B` (Charcoal Ink — matches logo line-art)
  - `--brand-accent: #D97724` (Warm Amber / Terracotta accent)
  - `--text-main: #18181B` (Charcoal Ink)
  - `--text-muted: #6B7280` (Neutral Slate — matches "PLAYGROUND." grey)
  - `--border-subtle: #E4E4E7` (1px crisp hairline border)
- **Typography (Google Fonts):**
  - Headings: `'Outfit', sans-serif` (weights 600, 700, letter-spacing `-0.02em`)
  - Body & UI: `'Plus Jakarta Sans', sans-serif` (weights 400, 500, 600)