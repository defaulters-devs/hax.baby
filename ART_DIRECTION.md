# ART DIRECTION: MORRO'S STARBOUND WORKSHOP
## Track 2: HAX Baby's First Website — Visual Design System

### 1. Vision & Core Philosophy
**Morro's Starbound Workshop** is a celestial, handcrafted, early-web inspired portfolio designed for Morro — the Little Star Prince.
Rather than a generic corporate SaaS landing page or a cookie-cutter card grid, Morro's website feels like a warm storybook artifact from a magical universe where postponed intentions ("Maybes") are transformed into starlight momentum.

---

### 2. The Color System
The palette blends regal celestial blues with cozy storybook warmth, starlight gold accents, and dreamy evening pastels.

```css
:root {
  /* Celestial Day Palette (Default) */
  --bg-primary: #FFFDF7;            /* Warm parchment starlight cream */
  --bg-secondary: #F6F9FE;          /* Gentle cloud tint */
  --bg-card: #FFFFFF;               /* Crisp storybook card */
  --bg-card-subtle: #F0F6FF;        /* Soft sapphire tint */
  --bg-accent-pill: #FFF9E6;        /* Starlight gold cream */

  /* Text & Contrast */
  --text-main: #14213D;             /* Deep midnight navy, ultra readable */
  --text-muted: #53647E;            /* Soft slate blue for supporting copy */
  --text-light: #8E9FB8;            /* Whispering star text */

  /* Brand Accents */
  --royal-blue: #1E4ED8;            /* Morro's royal coat sapphire */
  --royal-blue-hover: #173FB5;
  --celestial-blue: #38BDF8;        /* Sparkling eye sapphire & spirit companion */
  --celestial-soft: #E0F2FE;        /* Soft glow sky */
  --starlight-gold: #F59E0B;        /* Golden horn tips & stars */
  --starlight-gold-light: #FEF3C7;  /* Warm golden halo */
  --starlight-amber: #D97706;       /* Deep rich gold border */
  --dream-pink: #FCE7F3;            /* Soft blush */
  --lavender-glow: #EDE9FE;         /* Magic mist */
  --mint-accent: #D1FAE5;           /* Fresh momentum badge */

  /* Shadows & Handcrafted Depth */
  --shadow-sm: 0 2px 8px rgba(30, 78, 216, 0.06);
  --shadow-md: 0 8px 24px rgba(30, 78, 216, 0.10);
  --shadow-lg: 0 16px 40px rgba(30, 78, 216, 0.14);
  --shadow-gold: 0 0 25px rgba(245, 158, 11, 0.35);
  --shadow-blue-glow: 0 0 30px rgba(56, 189, 248, 0.35);

  /* Borders & Radii */
  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 28px;
  --radius-full: 9999px;
  --border-subtle: 1.5px solid rgba(30, 78, 216, 0.12);
  --border-gold: 2px solid rgba(245, 158, 11, 0.4);
}

/* Cosmic Night / Starlit Twilight Mode */
[data-theme="night"] {
  --bg-primary: #0A0F24;            /* Deep cosmic midnight */
  --bg-secondary: #0F1738;          /* Nebular violet night */
  --bg-card: #151F47;               /* Luminous dark navy slate */
  --bg-card-subtle: #1C2A5E;
  --bg-accent-pill: #26274D;

  --text-main: #F8FAFC;             /* Radiant star white */
  --text-muted: #CBD5E1;            /* Silvery starlight text */
  --text-light: #94A3B8;

  --royal-blue: #3B82F6;
  --royal-blue-hover: #60A5FA;
  --celestial-blue: #7DD3FC;
  --celestial-soft: #0C284D;
  --starlight-gold: #FCD34D;
  --starlight-gold-light: #4A3810;
  --border-subtle: 1.5px solid rgba(125, 211, 252, 0.2);
  --border-gold: 2px solid rgba(252, 211, 77, 0.45);
}
```

---

### 3. Typography
- **Headings & Display**: Whimsical, rounded, friendly font (`'Fredoka', 'Quicksand', 'Nunito', system-ui, sans-serif`).
- **Body & Microcopy**: Clean, readable geometric sans (`'Outfit', 'Nunito', 'Segoe UI', system-ui, sans-serif`).
- **Taglines & Accents**: Letter-spaced uppercase badges with star glyphs (`✦ MAKE THE WORK, DONE TODAY ✦`).

---

### 4. Character Asset Integration
- `public/assets/morro/morro-hero.png`: Used in Hero section with interactive 3D pointer parallax and floating spirit companion.
- `public/assets/morro/morro-adventure.png`: Used in the Origin Story and Maybe-to-Magic transformation celebration, showing Morro reaching out warmly to welcome visitors.
- Transparent PNG preservation: strict `object-fit: contain`, no black backgrounds, zero distortion, never obscuring Morro's face or eyes.

---

### 5. Layout Architecture & Anti-Template Principles
- **Varied Section Geometries**:
  - Hero: Asymmetrical layout with floating constellation pill tags and character spotlight.
  - Character Sheet: Storybook parchment dossier with official five fields, paw-print badges, and stats.
  - Origin Story: 4-scene illustrated storybook progression with interactive scene selector.
  - Maybe-to-Magic Ritual: Handcrafted ritual altar with floating cloudy Maybe particle, transmuter forge, and live countdown star clock.
  - Portfolio Projects: 3 distinct functional inventions (Maybe Catcher, Star Sprint, Done Constellation).
  - Guestbook & Side Quests: Retro guestbook with sticker badges, odometer hit counter, and stardust cursor trail.
- **Anti-Generic Quality Gate**:
  - No generic purple gradient blobs or boring bootstrap card rows.
  - No fake AI claims: deterministic, deeply empathetic task breakdown.
  - Every button has sound feedback (with mute switch), hover micro-animations, and celestial glow.
