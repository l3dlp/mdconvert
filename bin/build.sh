#!/bin/bash
mkdir -p public
cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/pdf.worker.min.js
npm run build
