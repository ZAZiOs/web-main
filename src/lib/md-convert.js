// md-convert.js
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Настраиваем marked (по желанию)
marked.setOptions({
  breaks: true,
  gfm: true, 
  silent: true
});

export function mdConvert(mdText) {
  // Конвертируем Markdown → HTML
  const dirty = marked.parse(mdText);

  // Очищаем HTML от возможных XSS
  const clean = DOMPurify.sanitize(dirty);

  return clean;
}
