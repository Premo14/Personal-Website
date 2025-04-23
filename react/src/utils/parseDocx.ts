import mammoth from 'mammoth';

/**
 * Parses a DOCX file into structured JSON using headers as section keys.
 *
 * @param file - A File object (e.g., from a file input)
 * @returns A promise resolving to a JSON object with section titles as keys
 */
export async function parseDocxToJson(file: File): Promise<Record<string, string>> {
    // Step 1: Convert the DOCX file to HTML
    const arrayBuffer = await file.arrayBuffer();
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

    // Step 2: Use DOMParser to turn an HTML string into a real HTML document
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Step 3: Extract headers and content beneath them into a JSON object
    const sections: Record<string, string> = {};
    let currentHeader: string | null = null;

    doc.body.childNodes.forEach((node) => {
        if (node.nodeName === 'H1' || node.nodeName === 'H2') {
            // This is a new section title
            currentHeader = (node as HTMLElement).innerText.trim();
            sections[currentHeader] = '';
        } else if (currentHeader) {
            // Add content under the last-known header
            sections[currentHeader] += (node as HTMLElement).innerText + '\n';
        }
    });

    return sections;
}
