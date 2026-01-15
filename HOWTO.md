# How to Use MDConvert

Welcome! This guide will help you set up and run MDConvert on your computer. You don't need to be an expert programmer to get this running.

## 1. Prerequisites

Before you begin, make sure you have **Node.js** installed. It's a tool that lets you run JavaScript outside of a browser.

-   **Check if you have it:** Open your Terminal (Mac) or Command Prompt (Windows) and type: `node -v`
-   **If you don't have it:** Download and install the "LTS" version from [nodejs.org](https://nodejs.org/).

## 2. Installation

1.  Open your Terminal.
2.  Navigate to the project folder (if you haven't already).
    ```bash
    cd path/to/mdconvert
    ```
3.  Install the project dependencies. This downloads all the little tools the project needs to work.
    ```bash
    npm install
    ```
    *Wait a moment for it to finish. You might see some "warn" messages—don't worry, that's normal!*

## 3. Running the App (Development Mode)

If you want to use the app or make changes to it:

1.  Run the start command:
    ```bash
    npm run dev
    ```
2.  You will see a message like: `Local: http://localhost:5173/`
3.  Open your web browser (Chrome, Safari, Firefox).
4.  Type `http://localhost:5173` into the address bar and hit Enter.

**Boom!** You should see the MDConvert interface.

## 4. How to Convert Files

1.  **Drag and Drop**: Take your HTML, PDF, or JS files from your computer and drop them into the big box that says "Click or Drop Files".
2.  **Wait**: You'll see a progress bar. It's usually very fast!
3.  **Download**: Click the "Download ZIP" button to save your converted Markdown files.

## 5. Building for Production

If you want to create a finalized version of the app (maybe to put on a server or send to a friend):

1.  Run the build script:
    ```bash
    ./bin/build.sh
    ```
2.  This creates a new folder called `dist/`.
3.  The `dist/` folder contains the "ready-to-go" website.

## Troubleshooting

-   **"Command not found"**: Ensure you installed Node.js and restarted your terminal.
-   **Build fails**: Try running `npm install` again to make sure everything downloaded correctly.
-   **PDFs not working**: Make sure you are running the app (step 3) and not just opening the HTML file directly. The app needs a "server" (which `npm run dev` provides) to read PDFs correctly.
