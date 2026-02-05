# Minimalist Gateway

A premium personal landing website for a multidisciplinary designer.

## Personalization Instructions

To set your own links, update the following files:

1.  **`src/components/InteractiveHeadline.tsx`**:
    *   Find the `nav` section at the bottom of the component.
    *   Replace `YOUR_PORTFOLIO_DRIVE_LINK` with your Google Drive link.
    *   Replace `YOUR_LINKEDIN_LINK` with your LinkedIn profile URL.
    *   Replace `YOUR_EMAIL@example.com` with your actual email address.

2.  **`src/app/page.tsx`**:
    *   Update the footer line `[Your Real Name] (Dali)` with your name.

3.  **`src/app/layout.tsx`**:
    *   Update the `metadata` title and description for SEO.

## Features

*   **Cursor-reactive parallax**: The headline shifts slightly based on mouse position (Desktop only).
*   **Easter Egg**: Clicking the headline cycles through alternate phrases.
*   **Minimalist Design**: Pure #000 background and #fff typography using the Inter font family.
*   **Accessibility**: High contrast, keyboard navigable, and respects `prefers-reduced-motion`.
