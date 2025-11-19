// md-convert.js
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Настраиваем marked (по желанию)
marked.setOptions({
    breaks: true,
    gfm: true, 
    silent: true
});

const purifyConfig = {
    USE_PROFILES: { svg: true, html: true },
  
    ADD_TAGS: [
        'svg',
        'path',
        'g',
        'circle',
        'rect',
        'line',
        'polyline',
        'polygon',
        'ellipse'
    ],
  
    ADD_ATTR: [
        'target',
        'fill',
        'stroke',
        'stroke-width',
        'd',
        'viewBox',
        'xmlns',
        'width',
        'height',
        'x',
        'y',
        'rx',
        'ry',
        'points',
        'style'
    ]
  };
  

export async function mdConvert(mdText) {

    const icons = [...mdText.matchAll(/\{(\w+)\}/g)];
    let html = await marked.parse(mdText);

    html = html.replaceAll(/<a\s+/g, '<a target="_blank" ');

    for (const match of icons) {
        const full = match[0];
        const name = match[1];

        try {
            const res = await fetch(`/bootstrap-icons-1.13.1/${name}.svg`);
            if (!res.ok) continue;

            let svg = await res.text();

            svg = svg
                .replace(/width="[^"]*"/g, '')
                .replace(/height="[^"]*"/g, '')
                .replace(
                /<svg /,
                `<svg fill="currentColor" style="width:1em;height:1em;vertical-align:-0.125em;" `
                );
            
            html = html.replace(full, svg);
        } catch (err) {
            console.warn("SVG load error:", name);
        }
    }

    return DOMPurify.sanitize(html, purifyConfig);
}
