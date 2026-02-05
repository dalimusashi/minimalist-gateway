# Minimalist Gateway

A premium personal landing website for a multidisciplinary designer.

## Personalization Instructions

To set your own links, update the following files:

1.  **`src/components/InteractiveHeadline.tsx`**:
    *   Find the `nav` section at the bottom of the component.
    *   Current Links:
        *   Portfolio: Google Drive Link
        *   LinkedIn: Gabriel Duro Design
        *   Contact: Opens the modal form.

2.  **`src/app/page.tsx`**:
    *   Update the footer line `Gabriel Duro (Dali)` if needed.

3.  **`src/app/layout.tsx`**:
    *   Update the `metadata` title and description for SEO.

## Custom Domain Setup

To connect your own domain (e.g., `yourname.com`):

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project.
3.  Navigate to **App Hosting** in the left-hand menu.
4.  Select your active backend.
5.  Click on the **Settings** tab and find the **Domains** section.
6.  Click **Connect domain** and enter your custom domain.
7.  Follow the instructions to update your DNS records (A and/or CNAME) at your domain registrar.

## Features

*   **Dual-Inbox Contact Form**: Submissions are sent to both `ahoy@vibedot.com` and `dalimusashi@gmail.com`.
*   **Cursor-reactive parallax**: The headline shifts slightly based on mouse position (Desktop only).
*   **Easter Egg**: Clicking the headline cycles through alternate phrases.
*   **Minimalist Design**: Pure #000 background and #fff typography using the Inter font family.
*   **Accessibility**: High contrast, keyboard navigable, and respects `prefers-reduced-motion`.
