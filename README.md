# MDConvert - Universal Markdown Converter

MDConvert is a secure, serverless, local-processing web application that converts various file formats (HTML, JS, JSX, PDF) into Markdown.

<img width="861" height="526" alt="mdconvert" src="https://github.com/user-attachments/assets/ee72c5da-f30a-40c2-9d36-2b4795b19c5c" />

## Features

-   **Universal Conversion**: Converts HTML, React (JSX), JavaScript, and PDF files to formatted Markdown.
-   **Local Processing**: All conversions happen entirely within your browser. No files are ever uploaded to a server, ensuring maximum privacy and security.
-   **Batch Processing**: Drag and drop multiple files to convert them simultaneously.
-   **Zip Download**: Download all converted files as a single ZIP archive.
-   **Dark/Light Mode**: Toggle between themes for a comfortable viewing experience.
-   **Responsive Design**: Built with Tailwind CSS for a seamless experience on desktop and mobile.

## Tech Stack

-   **Frontend Tooling**: Vite
-   **Styling**: Tailwind CSS
-   **Language**: JavaScript
-   **Libraries**:
    -   `turndown` (HTML to Markdown)
    -   `pdfjs-dist` (PDF parsing)
    -   `jszip` (Zip generation)

## Getting Started

1.  pnpm install
2.  pnpm dev

## Build

To build for production:

```bash
./bin/build.sh
```

## Testing

To run tests:

```bash
./bin/test.sh
```
