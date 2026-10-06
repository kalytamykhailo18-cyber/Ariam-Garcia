// Search results show ~60 characters of a <title> and ~155 of a meta description.
// These helpers keep the meaningful part inside those limits; og/twitter tags keep the full text.

const BRAND_SUFFIX = /\s+[—·|–-]\s+Ariam Garcia Balmaseda$/;
const SEPARATORS = [' — ', ' – ', ' · ', ' | ', ': '];

function clipWords(text: string, max: number, ellipsis: string): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - ellipsis.length);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:—–·|-]+$/, '') + ellipsis;
}

export function seoTitle(title: string, max = 65): string {
  if (title.length <= max) return title;
  const noBrand = title.replace(BRAND_SUFFIX, '');
  if (noBrand.length <= max) return noBrand;
  // Keep the headline before the first separator when it carries the topic on its own.
  for (const sep of SEPARATORS) {
    const head = noBrand.split(sep)[0];
    if (head !== noBrand && head.length >= 25 && head.length <= max) return head;
  }
  return clipWords(noBrand, max, '…');
}

export function seoDescription(text: string, max = 158): string {
  return clipWords(text.replace(/\s+/g, ' ').trim(), max, '…');
}
