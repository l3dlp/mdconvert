import './style.css'
import TurndownService from 'turndown'
import JSZip from 'jszip'
import * as pdfjsLib from 'pdfjs-dist'

// Worker setup for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';


// Theme Logic
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

themeToggle.onclick = () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
};

// Conversion Logic
const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
turndownService.remove(['script', 'style', 'noscript', 'iframe', 'svg', 'button', 'input', 'textarea']);

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const resultsList = document.getElementById('resultsList');
const actionArea = document.getElementById('actionArea');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const percentText = document.getElementById('percentText');
let convertedFiles = [];

dropZone.onclick = () => fileInput.click();
fileInput.onchange = handleFiles;
document.getElementById('resetBtn').onclick = () => {
    resultsList.innerHTML = '';
    actionArea.classList.add('hidden');
    document.getElementById('statusArea').classList.add('hidden');
    convertedFiles = [];
    fileInput.value = '';
};

dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('dragover'); };
dropZone.ondragleave = () => dropZone.classList.remove('dragover');
dropZone.ondrop = (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles({ target: { files: e.dataTransfer.files } });
};

async function handleFiles(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    document.getElementById('statusArea').classList.remove('hidden');
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split('.').pop().toLowerCase();
        let markdown = "";

        try {
            if (ext === 'pdf') {
                markdown = await processPdf(file);
            } else {
                const raw = await file.text();
                markdown = turndownService.turndown(extractContent(raw));
            }
            const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".md";
            convertedFiles.push({ name: cleanName, content: markdown });
            addToList(file.name, ext);
        } catch (err) {
            console.error(err);
            addToList(file.name, ext, true);
        }

        const pct = Math.round(((i + 1) / files.length) * 100);
        progressBar.style.width = pct + '%';
        percentText.innerText = pct + '%';
        progressText.innerText = file.name;
    }
    actionArea.classList.remove('hidden');
    showToast("Success");
}

async function processPdf(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = `# ${file.name}\n\n`;
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += `## Page ${i}\n\n${textContent.items.map(item => item.str).join(' ')}\n\n`;
    }
    return fullText;
}

function extractContent(text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    let source = doc.body.innerText.trim().length > 50 ? doc.body.innerHTML : "";
    doc.querySelectorAll('script').forEach(s => {
        const matches = s.textContent.match(/<([A-Z][A-Z0-9]*|h[1-6]|p|div|span|ul|li|section|article|b|i|strong|em)[^>]*>([\s\S]*?)<\/\1>|<([A-Z][A-Z0-9]*|h[1-6]|p|div|span|ul|li|section|article|b|i|strong|em)[^>]*\/>/gi);
        if (matches) source += " " + matches.join(" ");
    });
    return (source || doc.body.innerHTML)
        .replace(/\{.*?\}/g, '').replace(/\s(on[A-Z][a-z]+|className|style|ref|key)=["'].*?["']/g, '');
}

function addToList(name, ext, error = false) {
    const item = document.createElement('div');
    item.className = `neo-card p-3 flex justify-between items-center text-[10px] font-black uppercase`;
    item.innerHTML = `
        <div class="flex items-center space-x-2 truncate">
            <span class="px-1.5 border border-[var(--border)] rounded">${ext}</span>
            <span class="truncate">${name}</span>
        </div>
        <span class="${error ? 'text-red-500' : 'opacity-50'}">${error ? 'ERROR' : 'OK'}</span>
    `;
    resultsList.appendChild(item);
}

document.getElementById('downloadZip').onclick = async () => {
    const zip = new JSZip();
    convertedFiles.forEach(f => zip.file(f.name, f.content));
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `md_bundle_${Date.now()}.zip`;
    a.click();
};

function showToast(m) {
    const t = document.getElementById('toast');
    t.innerText = m;
    t.classList.remove('translate-y-32');
    setTimeout(() => t.classList.add('translate-y-32'), 2500);
}
