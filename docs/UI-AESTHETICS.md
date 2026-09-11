# KITESTUDIOS UI Aesthetics

## Purpose

This document is the visual and verbal north star for KITESTUDIOS concepts: websites, product pages, experiments, launch surfaces, and internal tools.

The brand should feel like an independent venture product studio with a strong editorial point of view. It is thoughtful, tactile, technical, and slightly unexpected. Every interface should feel designed by someone who cares about the idea behind the product—not merely assembled from a component library.

## The core feeling

**Warm industrialism with a signal flare.**

KITESTUDIOS lives between a print editorial, a workshop wall, and a well-made piece of software. The foundation is quiet and restrained: warm paper, near-black ink, fine rules, generous whitespace, and precise type. The energy arrives through one vivid accent, expressive headlines, diagrams, and small moments of motion.

The experience should be:

- **Confident, not loud** — make strong choices and leave room around them.
- **Human, not corporate** — write like a person with taste and a point of view.
- **Technical, not sterile** — show systems, states, and craft without drowning the user in jargon.
- **Experimental, not chaotic** — surprise should come from composition or interaction, never from poor hierarchy.
- **Useful, not ornamental** — visual character should clarify the product and invite action.

## Brand voice

Write with concise confidence and a little curiosity. Prefer specific, active language over startup language.

Good:

> Build the collection you pictured.

> Useful software, ambitious products, ideas worth keeping.

> A focused workspace for turning loose layers into a finished system.

Avoid:

- “Revolutionary,” “world-class,” “seamless,” or other unearned superlatives.
- Long explanations before the user knows what the thing does.
- Overly polished enterprise language.
- Jokes or slang that make the product feel disposable.

Headings can be brief, visual, and slightly poetic. Supporting copy should be plainspoken and concrete. Calls to action should describe the next meaningful step: **Open product**, **Visit project**, **Start building**, **See the work**.

## Color system

Use color with restraint. Most surfaces should remain quiet so the signal color has authority.

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f1efe9` | Primary light surface, backgrounds |
| Ink | `#191919` | Text, dark sections, primary buttons |
| Muted ink | `#6d6a62` | Supporting copy, metadata |
| Line | `#d8d4ca` | Dividers, borders, grids |
| Signal orange | `#ff5c35` | Accent, status, active state, emphasis |
| NFT cream | `#f4f1e8` | Optional warmer product surface |

The signal orange replaces the previous neon-green accent. Use it for one or two focal moments per view: a status badge, icon, active marker, button detail, key word, or diagram node. Do not turn every link and label orange.

For dark surfaces, use paper text and softened neutrals rather than pure white everywhere. For light surfaces, use ink for hierarchy and muted ink for explanation.

## Typography

The type system is intentionally hybrid:

- **Plus Jakarta Sans** — primary interface and body type. Use for navigation, paragraphs, buttons, labels, and practical information.
- **Cormorant Garamond** — expressive contrast. Use sparingly for an italic or serif phrase inside a large heading, a manifesto line, or an editorial aside.
- **JetBrains Mono** — system metadata. Use for eyebrows, indexes, versions, measurements, status labels, and technical annotations.

Typography should do most of the visual work. Favor large, tightly tracked headlines with compact line-height. Use sentence case for meaning and uppercase mono labels for orientation.

Recommended hierarchy:

```text
EYEBROW / 10px mono / bold / tracked uppercase
Primary headline / 64–122px sans / tight leading / tight tracking
Editorial emphasis / Cormorant Garamond / regular or italic
Body / 13–16px sans / 1.65–1.8 line-height
Metadata / 9–11px mono / tracked uppercase
```

## Layout and composition

Think in fields, not cards. Use a clear content width, strong edges, and a small number of large compositional moves.

- Use generous vertical sections: roughly `80–135px` of breathing room on desktop, reduced thoughtfully on mobile.
- Keep the main content within a centered `min(1160px, calc(100% - 48px))` frame.
- Use fine rules to divide sections and expose structure.
- Prefer asymmetry: a large statement beside a small note, a product image balanced by a narrow metadata column, or a technical detail anchored at the edge.
- Let one element break the grid—a rotated preview, oversized type, orbit, stamp, or cropped image—but keep the rest disciplined.
- Use 2–3 columns when the content benefits from comparison; collapse decisively to one column on small screens.

Whitespace is an active material. If a section feels crowded, remove content before adding decoration.

## Graphic language

Recurring motifs include:

- Thin grids and ruled dividers.
- Orbits, circles, crop marks, and diagram-like lines.
- Small numbered indexes and bracketed section labels such as `[ 01 ] / Inside the app`.
- Tactile imagery with restrained saturation, warm neutrals, and occasional grayscale.
- Dark product previews that feel like instruments or workbenches.
- Signal-orange dots, borders, active states, and small bursts of emphasis.

Imagery should feel observed and purposeful: product artifacts, material details, environments, people at work, or abstract forms with a point of view. Avoid generic stock imagery, glossy gradients, and decorative 3D objects with no relationship to the idea.

## Interaction and motion

Motion should feel physical, measured, and useful.

- Use short, calm transitions for hover states, borders, color, and image scale.
- Let cards lift slightly or images drift subtly; avoid bouncing interfaces.
- Use motion to reveal hierarchy, not to compete with it.
- Keep focus states visible and keyboard-friendly.
- External product links should be obvious and should use an arrow or equivalent directional cue.
- A signal-orange accent can mark the active or newly revealed state, but should not flash or pulse continuously.

## Component character

### Navigation

Sticky, light, translucent, and quiet. Use a fine bottom rule. The brand mark is compact and typographic; navigation is uppercase mono or small bold sans. Primary navigation actions can use an ink block with a small signal-orange detail.

### Buttons and links

Primary buttons are dark ink with paper text. Secondary actions are often borderless or underlined rather than enclosed in a second heavy button. Links should be short, directional, and visually precise.

### Cards

Cards should expose a project or idea, not hide it behind UI chrome. Use an image or strong visual field, a small index/status label, a clear title, and one concise description. Borders and spacing are more important than shadows.

### Sections

Open sections with a mono eyebrow, a large statement, and one supporting thought. A section should have one job: introduce, explain, compare, invite, or close.

## Concept-building recipe

When starting a new concept, define these five things first:

1. **The sentence:** What is this, in one plainspoken line?
2. **The tension:** What contrast gives it character? For example, warm / technical or playful / precise.
3. **The signal:** What single color, motion, image, or phrase should people remember?
4. **The proof:** What artifact, interaction, or detail makes the idea feel real?
5. **The exit:** What should the user do next?

Then build the first screen around one dominant statement, one supporting explanation, and one clear action. Add detail only when it improves understanding or atmosphere.

## Quality bar

Before calling a concept finished, ask:

- Does it feel warm and intentional within the first second?
- Is the hierarchy obvious without reading every word?
- Is the signal orange acting as a signal rather than a wallpaper color?
- Do the type roles feel distinct and consistent?
- Is there one memorable compositional idea?
- Does every decorative element support the product’s story?
- Does the mobile layout preserve the same point of view?
- Can a user tell what to do next?

If the answer is no, simplify the surface before adding more style.
