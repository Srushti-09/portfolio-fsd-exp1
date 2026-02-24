1. Project Overview
A high-impact, single-page (or minimal multi-page) portfolio designed to showcase creative work with a focus on bold visual hierarchy and smooth user interaction.

2. Visual Identity & Aesthetic
The design follows a "Dark Mode" aesthetic with a structured, grid-based layout that feels like a premium digital magazine.

A. Color Palette
Primary Background: #05070E (Deep Obsidian Black)

Secondary Background/Cards: #1B5C64 (Deep Teal) or #4D4138 (Muted Earth)

Primary Accent: #DBD912 (Vibrant Acid Yellow/Lime) — Used for CTAs and highlights.

Secondary Accents: #519DA5 (Soft Teal) and #AC684E (Terracotta).

Typography: #FFFFFF (Pure White) for headers; #A0A0A0 (Silver Gray) for body text.

B. Typography
Headings: Large, Bold Sans-Serif (e.g., Syne, Clash Display, or Inter Bold).

Style: Tight letter spacing, uppercase for impact.

Body Text: Clean Geometric Sans-Serif (e.g., Inter, Plus Jakarta Sans).

Accents: Monospace fonts (e.g., JetBrains Mono) for labels or dates to give a "technical" feel.

3. Layout Structure
The page is divided into high-contrast sections with distinct "blocks."

Section 1: Hero (The Hook)
Left Side: Large-scale typography introducing your name and role (e.g., "CREATIVE DEVELOPER & DESIGNER").

Right Side/Center: A high-quality stylized portrait or a 3D abstract element.

Floating Elements: Small pill-shaped badges showing "Available for Work" or your current location.

Section 2: Selected Works (The Meat)
Grid: Asymmetrical bento-style grid or large vertical cards.

Interaction: On hover, images should slightly scale up or trigger a color overlay change (from grayscale to full color).

Details: Each project card displays the Title, Category (e.g., Branding, Web), and Year.

Section 3: About & Services
Split layout: Left side lists "What I Do" (Services) in a clean list format with the Acid Yellow accent.

Right side features a brief, punchy bio.

Section 4: Footer / Contact
Huge CTA: "LET’S WORK TOGETHER" in massive typography that spans the width of the screen.

Links: Social icons (LinkedIn, Dribbble, GitHub) in a minimalist row.

Email: Large, clickable email address that copies to the clipboard on click.

4. Technical Specifications
A. Tech Stack (Recommended)
Frontend: Next.js or React (for smooth routing and SEO).

Styling: Tailwind CSS (perfect for the "blocky" brutalist utility classes).

Animations: Framer Motion (essential for replicating the smooth transitions seen in the Dribbble concept).

Deployment: Vercel or Netlify.

B. Key Features & Animations
Smooth Scroll: Use a library like Lenis for a premium, heavy-feeling scroll effect.

Magnetic Buttons: The "Contact" or "View Project" buttons should have a magnetic pull effect towards the cursor.

Marquee Text: A moving horizontal text bar (e.g., "OPEN FOR FREELANCE • AVAILABLE NOW") to add dynamism.

Custom Cursor: A small circle cursor that expands or changes color when hovering over clickable project cards.

5. Content Strategy
Copy: Keep it minimal. Let the visuals do the talking. Use active verbs (e.g., "Crafting digital experiences" instead of "I make websites").

Imagery: Use high-resolution mockups. If you are a developer, use stylized screenshots of code or UI components.

6. Implementation Checklist
[ ] Set up Tailwind config with the #DBD912 accent color.

[ ] Implement a "Bento Grid" for the project section.

[ ] Add Framer Motion whileHover and initial/animate states for section entrances.

[ ] Optimize images using Next/Image for fast loading.

[ ] Ensure mobile responsiveness (stacking the side-by-side hero elements vertically).