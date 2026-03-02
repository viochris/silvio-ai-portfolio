# **App Name**: Silvio.AI Portfolio

## Core Features:

- Dynamic Theming System: An interactive toggle to switch between a Cyberpunk/Hacker dark mode and a Clean Professional light mode, with an animated 'Binary Background' that adapts its color to the active theme.
- Interactive Homepage Elements: Features a 'TypewriterEffect' for dynamic subtitle display, an infinite 'TechMarquee' showcasing the tech stack, and an 'Animated Code Snippet' simulating a VS Code window.
- Project Showcase with Detail Modals: A grid display of project cards, each with a 'Details' button that opens a full-screen modal providing in-depth information about 'The Problem', 'The Solution', and 'Technologies Used'.
- Skill Visualization Dashboard: Presents a custom SVG Radar Chart for an at-a-glance visualization of skill distribution and linear progress bars for detailed skill proficiency metrics.
- Live RAG AI Chatbot: A fully functional chat interface making POST requests to an external API endpoint, including a language toggle, custom safe Markdown parsing tool for bot responses, and robust error handling.
- Navigation & Resource Access: A sticky glassmorphism navbar providing intuitive navigation across portfolio sections, alongside quick access to a CV download and professional certifications.

## Style Guidelines:

- Primary color (Dark Mode Baseline): A deep, vibrant electric blue (#3C3CDD) that signifies technology and precision, serving as the foundational accent for interactive elements and key information.
- Background color (Dark Mode Baseline): A desaturated, dark slate-blue (#21212C), chosen to provide a deep, immersive canvas that echoes the futuristic tone of the cyberpunk theme, allowing bright UI elements to stand out prominently.
- Accent color (Dark Mode Highlight): A bright, luminous sky blue (#55A6F6), providing 'neon' highlights for interactive states, progress indicators, and generative AI features, enhancing visual feedback and excitement.
- Light Mode Interpretation: The core design principles will translate to a clean professional light mode, utilizing a pale background (e.g., bg-slate-50) for readability and text colors in the darker grey spectrum (e.g., text-slate-800), with primary and accent hues adapted to slightly softer blue and indigo tones for consistency.
- Headline Font: 'Space Grotesk' (sans-serif) is recommended for all headings and prominent text, providing a modern, slightly futuristic, and technical feel that aligns with an AI Engineer's portfolio.
- Body Text Font: 'Inter' (sans-serif) is recommended for all body copy, descriptive content, and UI labels, ensuring excellent legibility across all screen sizes and maintaining a clean, professional appearance.
- Code Snippet Font: 'Source Code Pro' (monospace) is recommended specifically for displaying code within the 'CodeWindow' and any other technical code blocks, ensuring clear, distinct character rendering.
- Utilize clean, outlined icons from 'lucide-react' throughout the application. Icons should dynamically adapt their color to complement the active theme's accent and text colors, ensuring clarity and thematic consistency.
- Employ a responsive, modular, and adaptive layout structure. Key features include a sticky navigation bar with a subtle glassmorphism effect, grid-based arrangements for projects and certifications, and a two-column contact section, all designed for optimal viewing across various devices.
- Integrate subtle yet impactful animations to enhance user experience: 'TypewriterEffect' for hero text, staggered slide-up animations for 'CodeWindow' lines, a glowing pulse border for the avatar, and 'typing' indicators with auto-scroll for the AI chatbot interactions, creating an engaging and dynamic interface.