import { writable, derived } from 'svelte/store';

// Store для текущего языка
export const currentLang = writable('en');

// Store для переводов
export const translations = writable({});

// Функция для загрузки переводов с сервера
export const loadTranslations = async (lang) => {
  try {
    const response = await fetch(`/lang/${lang}/lang.json`);
    if (response.ok) {
      const data = await response.json();
      translations.set(data); // Обновляем переводы
    } else {
      console.error(`Ошибка загрузки файла переводов для языка ${lang}`);
    }
  } catch (error) {
    console.error('Ошибка при загрузке переводов:', error);
  }
};

// Когда меняется язык, загружаем соответствующий файл
export const setLanguage = (lang) => {
  currentLang.set(lang);
  loadTranslations(lang); // Загружаем переводы для нового языка
};

// Функция для перевода строк с параметрами
export const translate = derived([currentLang, translations], ([$lang, $translations]) => {
  return (key, params = {}) => {
    let string = $translations[$lang]?.[key] || key;

    // Подстановка именованных параметров {name}, {count}
    if (typeof params === 'object') {
      Object.keys(params).forEach(param => {
        string = string.replace(new RegExp(`{${param}}`, 'g'), params[param]);
      });
    }
    // Подстановка позиционных параметров {0}, {1}
    else if (Array.isArray(params)) {
      params.forEach((value, index) => {
        string = string.replace(new RegExp(`{${index}}`, 'g'), value);
      });
    }

    return string;
  };
});
