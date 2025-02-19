# Écologies des Pratiques (EL2MP) Project

The **Écologies des Pratiques (EL2MP)** project explores the transformative impact of Large Language Models (LLMs) on research, creativity, and communication across various domains. Supported by Google through its commitment to advancing ethical and impactful AI practices, this initiative combines cutting-edge technological tools with critical reflection on their implications.

# **TO-DO LIST**

## **Core Functionality**

- [x] **Database**

  - Finalize the structure and fields for `cardsDb` and `floatersDb`.
  - Ensure seamless integration with `global_db.js`.

- [x] **Add symlink for `db.js`**

  - Create a symbolic link pointing to `/src/lib/database/global_db.js`.

- [ ] **Visual Manipulation on Cover Images**

  - Add filters (e.g., grayscale, duotone effects).
  - Introduce hover-based interactions.

- [x] **Generic Transitions**

  - Define transition styles for cards and floaters (e.g., fade, slide).
  - Consider reusable CSS/Svelte animations.

- [x] **Smooth Scrolling**

  - Enable smooth vertical scrolling for content sections.
  - Add anchor-based navigation for a seamless user experience.

- [ ] **Trials with Real Content**
  - Populate the app with finalized data.
  - Test layout and functionality with real-world assets.

---

## **Enhancements**

- [ ] **Prevent Floaters from Squashing on the Sides**

- [ ] **Pre-Load Images in Scroll Containers**

  - Use lazy-loading for images but prefetch critical assets.

- [ ] **Improve Sidebar Layout**

  - Enhance spacing, font size, and alignment.
  - Ensure the sidebar adapts to dynamic content sizes.

- [ ] **Adapt ScrollFlex Layout Based on Database**

  - Dynamically calculate spacing and flex properties based on card content.

- [x] **Bring Buttons on Top**

  - Set higher `z-index` for button layers.

- [x] **Better Align Cards on Loading**

  - Ensure proper alignment for cards during the initial load animation.

- [x] **Fix Hero-Title Color Triggering**

  - Resolve inconsistent color transitions when switching cards.

- [x] **Floaters Filtering Based on Card Parenting**

  - Now floaters in the db can be generated with a parent option, if so, they are bounded to the parent

- [ ] Floaters when reset tends to go over the boundaries
- [x] **Scrollbar on side-bard is bugged**

---

## **Content and Design Trials**

- [ ] **Insert GIFs as Images**

  - Test the inclusion of GIFs for content sections or floaters.

- [ ] **Circle Logo Instead of EL2MP Mini Logo**
  - Replace the small logo with the circle logo in all components.

## Project Overview

At the heart of this project lies a **collaborative and interdisciplinary approach**, engaging researchers, practitioners, and students from diverse fields. By experimenting with LLMs, we aim to understand their potential as catalysts for new forms of knowledge production and dissemination while addressing the ecological and ethical questions they raise.

The project focuses on three key areas:

### 1. Technological Experimentation

By integrating LLMs into practical workflows, we assess how these tools reshape academic and professional practices. From creative writing to data analysis, the project tests the boundaries of LLMs' generative capabilities.

### 2. Critical Reflection

Alongside experimentation, we foster discussions on the broader societal and ecological implications of LLM adoption:

- What are the costs and benefits of scaling these technologies?
- How do they challenge or reinforce existing structures of knowledge and power?

### 3. Community Building

Through workshops, public events, and collaborative platforms, we aim to build a community of thinkers and makers who can collectively imagine and shape the future of AI-driven practices.

## Project Support

With Google’s support, **Écologies des Pratiques** not only investigates the possibilities of LLMs but also critically examines their role within contemporary ecological, cultural, and institutional systems. By bridging technological innovation and critical inquiry, this project seeks to illuminate how these powerful tools can contribute responsibly to a sustainable and inclusive future.

---

For more information, visit the [EL2MP project website](https://medialab.github.io/EL2MP/).
