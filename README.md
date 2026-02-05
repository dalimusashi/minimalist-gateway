
# Minimalist Gateway

A premium personal landing website for Gabriel Duro.

## Features

*   **Dual-Inbox Contact Form**: Submissions are automatically sent to `ahoy@vibedot.com` and `dalimusashi@gmail.com`.
*   **Cursor-reactive Parallax**: The headline reacts to mouse movement (Desktop).
*   **Easter Egg**: Clicking the headline cycles through alternate phrases.
*   **Minimalist Design**: Pure black background (#000) and white typography (#fff) using the Inter font family.

## Custom Domain Setup

To connect your own domain (e.g., `gabrielduro.com`):

1.  **Open Firebase Console**: Go to [console.firebase.google.com](https://console.firebase.google.com/).
2.  **Select Project**: Click on your active project.
3.  **App Hosting**: Navigate to **App Hosting** in the left sidebar.
4.  **Select Backend**: Click on the backend instance for this app.
5.  **Settings**: Click the **Settings** tab.
6.  **Domains**: Scroll to the **Domains** section and click **Connect domain**.
7.  **DNS Verification**: Enter your domain and follow the instructions to add the provided A/CNAME records to your domain registrar (e.g., Google Domains, Namecheap, GoDaddy).
8.  **Wait for SSL**: Once DNS is verified, Firebase will automatically provision an SSL certificate (may take up to 24 hours).

## Personalization

If you need to update links or emails in the future:
*   **Links**: Edit `src/components/InteractiveHeadline.tsx`.
*   **Emails**: Edit the recipients in `src/app/actions/contact.ts`.
*   **Footer**: Edit the name in `src/app/page.tsx`.
