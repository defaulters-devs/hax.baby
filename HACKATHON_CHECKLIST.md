# HAX Baby Hackathon — Track 2: Your Own Baby
## Project Morro: Clean & Focused Portfolio Checklist

### 1. Mandatory Track 2 Core Requirements
- [x] **Character Introduction & What They Are**: Morro, rare magical SHiko born from the stars, white & blue fur, sapphire eyes, dragon horns with golden tips, and blue companion Sparky.
- [x] **5-Point Character Sheet (About Dossier)**:
  - [x] 1. Name: Morro (The Little Star Prince)
  - [x] 2. What they are: Species, appearance, quirks, and personality (Playful, curious, kind, cheerful, adventurous).
  - [x] 3. What they do: Profession/talent — Catches "Maybe" postponement energy, transforms it into positive reminders and tiny first steps with zero shame.
  - [x] 4. Their story: Cosmic origin story — Born from converged postponement clouds turned into a star.
  - [x] 5. Tagline: "Make the Work, Done Today" & supporting slogan "Turn Maybe Into Done."
- [x] **Three Portfolio Projects (Portfolio Case Studies)**:
  - [x] Project 1: **Maybe Catcher** (Signature invention that captures postponement energy and suggests a micro-step; includes working action to experience ritual).
  - [x] Project 2: **Star Sprint Engine** (Fictional case study for a lightweight focus timer; includes visual dial preview, engineering blueprint, and working Case Study modal).
  - [x] Project 3: **Done Constellation** (Fictional case study for milestone sky charting; includes compact constellation preview, concept, and working Case Study modal).
- [x] **Origin Story (4 Visual Scenes <150 words each)**:
  - [x] Scene 1: Tomorrow Again (Tasks postponed, grey Maybe particles float).
  - [x] Scene 2: The Maybe Storm (Clouds gather in the cosmos into a swirling storm).
  - [x] Scene 3: The Birth of Morro (Energy converges into a bright star, birthing Morro & Sparky).
  - [x] Scene 4: A New Purpose (Morro catches Maybes and returns glowing momentum stars to Earth).
- [x] **Visitor-Responsive Interaction (Immersion)**:
  - [x] Real-time eye & head 3D pointer tracking with smooth interpolation and touch support.
  - [x] Celestial Day / Cosmic Night mood toggle altering scene lighting & theme tokens.
- [x] **Mobile-Friendly Layout**:
  - [x] Fluid responsive layouts (360px up to desktop), mobile drawer menu, vertically stacked cards.
- [x] **Hidden Easter Egg**:
  - [x] Tapping Sparky the Spirit Companion 3 times triggers the secret "Morro & Sparky's Midnight Tea Party" modal with custom lullaby chime and companion badge.
- [x] **Visible Credits in Footer**:
  - [x] Complete attribution for character artwork, Web Audio API synthesis, fonts, and icons.

---

### 2. Tier 1 & Tier 2 Standout Features
- [x] **Tier 1: Character Pointer Tracking**: 3D mathematical lerp tracking pointer coordinates.
- [x] **Tier 1: Scroll-Driven Story**: 4 illustrated scenes with tab navigation.
- [x] **Tier 1: Working Mood/Theme Toggle**: Shifts entire palette between Celestial Day and Cosmic Night.
- [x] **Tier 2: Nightlight / Flashlight Dream Cursor**: Soft radial starlight beam illuminating subtle background nebulae in Cosmic Night mode.
- [x] **Tier 2: Web Audio Synthesizer**: Handcrafted crystal chimes, Sparky chirps, and celebration fanfare with a persistent, prominent Mute/Unmute switch.

---

### 3. Signature Experience: Simplified Maybe-to-Magic Ritual
- [x] Step 1: Visitor enters a task they have been putting off (or picks a quick sample).
- [x] Step 2: Visitor clicks "Catch the Maybe".
- [x] Step 3: Magical animation shows the Maybe cloud absorbed into Morro's pouch with sound feedback.
- [x] Step 4: Displays a positive, non-judgmental reminder.
- [x] Step 5: Suggests one achievable first step.
- [x] Step 6: Visitor can copy the step ("Copy First Step") or trigger "I'm Ready to Start!" (celebration fanfare + confetti).
- [x] Input validation with meaningful feedback for empty submissions.

---

### 4. Parked Optional Modules (Safely Kept in Codebase, Hidden From Main Flow)
- [*] Standalone countdown timer app (Parked as a clean portfolio case study card).
- [*] Local multi-task journal panel (Parked to eliminate clutter).
- [*] Interactive star-collection game (Parked as a clean constellation case study card).
- [*] Live Guestbook (Preserved in code, parked from main flow to keep focus on core portfolio).

---

### 5. Quality & Engineering Verification
- [x] `npm run build`: Production bundle builds cleanly in ~500ms with 0 errors.
- [x] `npm run lint`: ESLint passes with 0 errors and 0 warnings.
- [x] Tested all navigation smooth-scroll anchors (`#hero`, `#about`, `#story`, `#ritual`, `#projects`).
- [x] Tested Easter egg trigger (triple click on Sparky).
- [x] Tested Case Study modal open, keyboard Escape, and close.
