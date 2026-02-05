
# Minimalist Gateway

A premium personal landing website for Gabriel Duro.

## Features

*   **Dual-Inbox Contact Form**: Submissions are automatically sent to `ahoy@vibedot.com` and `dalimusashi@gmail.com`.
*   **Firestore Integration**: Every message is securely logged in your database for backup.
*   **Cursor-reactive Parallax**: The headline reacts to mouse movement (Desktop).
*   **Easter Egg**: Clicking the headline cycles through alternate phrases.
*   **Minimalist Design**: Pure black background (#000) and white typography (#fff) using the Inter font family.

## Deployment & Cost FAQ

### 1. Should I publish before connecting a domain?
**Yes.** Deploy the app first. Firebase will give you a `.web.app` address. Once you've confirmed everything looks perfect there, follow the "Custom Domain Setup" steps below.

### 2. Is it free?
*   **Firebase**: The "Blaze Plan" (Pay-as-you-go) is recommended for modern features, but for this site, you'll likely stay within the **Free Tier** limits (meaning $0 cost from Google).
*   **Emails**: Using Resend's free tier allows up to **3,000 emails/month** for free.
*   **Domain**: You only pay the standard annual fee to your domain registrar (e.g., GoDaddy, Namecheap).

## Custom Domain Setup

1.  **Open Firebase Console**: Go to [console.firebase.google.com](https://console.firebase.google.com/).
2.  **Select Project**: Click on your active project.
3.  **App Hosting**: Navigate to **App Hosting** in the left sidebar.
4.  **Select Backend**: Click on your app's backend instance.
5.  **Settings**: Click the **Settings** tab.
6.  **Domains**: Click **Connect domain** and follow the DNS verification steps provided.

## Personalization

*   **Links**: Edit `src/components/InteractiveHeadline.tsx`.
*   **Emails**: Edit the recipients in `src/app/actions/contact.ts`.
*   **Footer**: Edit the name in `src/app/page.tsx`.
