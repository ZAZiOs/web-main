// i18n.js
import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import axios from 'axios';
import { marked } from 'marked';
import phrases from './phrases.json';

import {mdConvert} from './md-convert.js';

export const s = writable({});           // 👈 реактивный объект переводов
export const currentLang = writable('ru');

export const projects = [
  {
      category: "ovk",
      icon: "..",
      files: [
          { name: "ovknative", status: "wip" },
          { name: "ovkwinxp", status: "done" },
          { name: "ovkcoinbot", status: "archived" }
      ]
  },
  {
      category: "dm",
      icon: "..",
      files: [
          { name: "dm_infra", status: "done" },
          { name: "dm_arg", status: "done" },
          { name: "dm_chan_tgbot", status: "done" }
      ]
  },
  {
      category: "translations",
      icon: "..",
      files: [
          { name: "deltarunaru", status: "wip" },
          { name: "gmsutml", status: "wip" },
          { name: "wiilink", status: "archived" },
          { name: "rhfever", status: "archived" }
      ]
  },
  {
      category: "other",
      icon: "..",
      files: [
          { name: "ld58", status: "done" },
          { name: "pokedex", status: "archived" }
      ]
  },
  {
      category: "unfinished",
      icon: "..",
      files: [
          { name: "questbench", status: "archived" },
          { name: "mindwave", status: "wip" }
      ]
  }
];


export function getLangCode() {
  let langCode;
  currentLang.subscribe((value) => {
    langCode = value;
  })();
  return langCode;
}

export const t = derived(
  [s, currentLang],
  ([$s, $lang]) =>
    (key, ...replacements) => {
      let value = key.split('.').reduce((obj, part) => obj?.[part], $s);
      if (typeof value !== 'string') return "str." + key;

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
    const MDsToFetch = [
      "about",
      "ovknative", "ovkwinxp", "ovkcoinbot",
      "dm_infra", "dm_arg", "dm_chan_tgbot", 
      "deltarunaru", "gmsutml", "wiilink", "rhfever",
      "ld58", "pokedex",
      "questbench", "mindwave"
    ]
    tempobj.md = {};

    await Promise.all(
      MDsToFetch.map(async (mdname) => {
        const res = await axios.get(`/lang/${langcode}/${mdname}.md`).catch(() => {});
        if (res?.data) tempobj.md[mdname] = await mdConvert(res.data);
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
  changeLanguage('en');
}


export const getPhrase = derived(currentLang, ($lang) => {
  return () => {
    const list = phrases[$lang] || phrases['en'] || [];
    if (list.length === 0) return '';
    return list[Math.floor(Math.random() * list.length)];
  };
});

export function formatLocalizedDate(dateString) {
  if (!dateString) return '';

  const [day, month, year] = dateString.split('.').map(Number);
  const date = new Date(year, month - 1, day);

  let langCode;
  currentLang.subscribe(v => (langCode = v))();

  const formattedDate = new Intl.DateTimeFormat(langCode, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);

  let translation;
  s.subscribe(v => {
    translation = v?.projects?.updated_at || 'Updated %1s';
  })();

  let result = translation.replace('%1s', formattedDate);

  return result;
}
