# CODEX - MDConvert Technical Documentation

## 1. Project Overview
MDConvert is a client-side web application designed to convert various file formats (HTML, Markdown, PDF) into structured Markdown. It prioritizes privacy and security by performing all processing locally within the user's browser, utilizing Web Workers and local libraries without any server-side processing.

## 2. Architecture

### 2.1 Core Stack
-   **Runtime**: Browser-based (Client-side only)
-   **Bundler**: Vite (v7.x)
-   **Styling**: Tailwind CSS (v3.x) with PostCSS
-   **Language**: Modern JavaScript (ESNext)

### 2.2 Key Libraries
-   **Turndown**: Converts HTML to Markdown.
-   **PDF.js**: Mozilla's PDF reader library for parsing PDF content.
-   **JSZip**: For bundling converted files into a downloadable ZIP archive.

### 2.3 Dependency Management Strategy
The project is configured to avoid external CDNs for production reliability and privacy. All dependencies are managed via `npm` and bundled by Vite.
-   **PDF Worker Handling**: To avoid CORS and bundling issues with the PDF.js worker, the `pdf.worker.min.mjs` is copied to the `public/` directory during the build process and loaded as a static asset.

## 3. Directory Structure

```
mdconvert/
├── bin/
│   ├── build.sh       # Production build script (handles worker copy)
│   └── test.sh        # Test runner (placeholder)
├── public/            # Static assets served by Vite
│   └── pdf.worker.min.mjs # Copied during build
├── src/
│   ├── index.html     # Entry point
│   ├── main.js        # Core logic (PDF processing, UI events)
│   └── style.css      # Tailwind directives & custom styles
├── dist/              # Production build output
├── package.json       # Dependencies & Scripts
├── vite.config.js     # Vite configuration
└── tailwind.config.js # Tailwind configuration
```

## 4. Build Pipeline

The build process is orchestrated by `bin/build.sh`:
1.  **Worker Provisioning**: Creates `public/` and copies `node_modules/pdfjs-dist/build/pdf.worker.min.mjs` to it. This ensures the correct version of the worker is available at runtime.
2.  **Vite Build**: Runs `vite build`, which:
    -   Resolves imports starting from `src/index.html`.
    -   Bundles and minifies JavaScript and CSS.
    -   Outputs assets to `dist/`.

## 5. Security Model

### 5.1 Local Processing
-   **No Backend**: There is no API or backend server. All file inputs are read using the HTML5 `FileReader` API.
-   **Data Persistence**: No data persists beyond the browser session. Refreshes clear the state.

### 5.2 Dependency Security
-   Project uses locked versions for critical libraries (`pdfjs-dist`).
-   Regular `npm audit` checks are recommended (recently patched for execution vulnerabilities).

## 6. Development

### 6.1 Setup
```bash
npm install
```

### 6.2 Local Dev
```bash
npm run dev
# Starts Vite dev server at http://localhost:5173
```

### 6.3 Production Build
```bash
./bin/build.sh
# Verifies worker placement and runs vite build
```
