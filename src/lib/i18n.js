// i18n.js
import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import axios from 'axios';
import { marked } from 'marked';
import phrases from './phrases.json';

export const s = writable({});           // 👈 реактивный объект переводов
export const currentLang = writable('ru');

export const t = derived(
  [s, currentLang],
  ([$s, $lang]) =>
    (key, ...replacements) => {
      let value = key.split('.').reduce((obj, part) => obj?.[part], $s);
      if (typeof value !== 'string') return key;

      return value.replace(/%(\d+)s/g, (_, n) => {
        const i = parseInt(n) - 1;
        return replacements[i] ?? `%${n}s`;
      });
    }
);

// 🌐 смена языка
export async function changeLanguage(langcode, beforeset) {
  if (!browser) return;

  try {
    const resp = await axios.get(`/lang/${langcode}/lang.json`);
    const tempobj = resp.data;

    // Загружаем markdown-файлы
    const MDsToFetch = ['questbench', 'ovknative', 'about'];
    tempobj.md = {};

    await Promise.all(
      MDsToFetch.map(async (mdname) => {
        const res = await axios.get(`/lang/${langcode}/${mdname}.md`);
        tempobj.md[mdname] = marked.parse(res.data);
      })
    );

    if (beforeset) beforeset();
    
    s.set(tempobj); // 👈 обновляем store
    currentLang.set(langcode); // 👈 обновляем язык
  } catch (err) {
    console.error('Language load failed:', err);
  }
}

// Автоматически грузим язык при старте
if (browser) {
  changeLanguage('ru');
}


export const getPhrase = derived(currentLang, ($lang) => {
  return () => {
    const list = phrases[$lang] || phrases['en'] || [];
    if (list.length === 0) return '';
    return list[Math.floor(Math.random() * list.length)];
  };
});