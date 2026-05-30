(function () {
  const storageKey = 'readerTheme';
  const themes = [
    { id: 'dark', label: 'Тёмный прозрачный' },
    { id: 'book', label: 'Книжный' },
    { id: 'scarlet', label: 'Красно-белый' }
  ];

  function getTheme() {
    const savedTheme = localStorage.getItem(storageKey);
    return themes.some((theme) => theme.id === savedTheme) ? savedTheme : 'dark';
  }

  function getThemeLabel(themeId) {
    return themes.find((theme) => theme.id === themeId)?.label || themes[0].label;
  }

  function closeMenu() {
    const switcher = document.getElementById('themeSwitcher');
    const trigger = document.getElementById('themeToggle');
    if (!switcher || !trigger) return;

    switcher.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  function updateThemeUi(themeId) {
    const trigger = document.getElementById('themeToggle');
    if (!trigger) return;

    trigger.textContent = `🎨 ${getThemeLabel(themeId)}`;
    trigger.setAttribute('aria-label', `Текущая тема: ${getThemeLabel(themeId)}. Открыть список тем`);

    document.querySelectorAll('.theme-option').forEach((option) => {
      const active = option.dataset.themeOption === themeId;
      option.classList.toggle('active', active);
      option.setAttribute('aria-pressed', String(active));
    });
  }

  function applyTheme(themeId) {
    document.documentElement.dataset.theme = themeId;
    localStorage.setItem(storageKey, themeId);
    updateThemeUi(themeId);
  }

  function createSwitcher() {
    if (document.getElementById('themeSwitcher')) return;

    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    switcher.id = 'themeSwitcher';

    const trigger = document.createElement('button');
    trigger.className = 'theme-trigger';
    trigger.type = 'button';
    trigger.id = 'themeToggle';
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    const menu = document.createElement('div');
    menu.className = 'theme-menu';
    menu.setAttribute('role', 'menu');

    themes.forEach((theme) => {
      const option = document.createElement('button');
      option.className = 'theme-option';
      option.type = 'button';
      option.dataset.themeOption = theme.id;
      option.textContent = theme.label;
      option.setAttribute('role', 'menuitem');
      option.addEventListener('click', () => {
        applyTheme(theme.id);
        closeMenu();
      });
      menu.appendChild(option);
    });

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = switcher.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(open));
    });

    switcher.append(trigger, menu);

    const launcher = document.querySelector('.launcher');
    if (launcher) {
      launcher.appendChild(switcher);
    } else {
      document.body.appendChild(switcher);
    }
  }

  const initialTheme = getTheme();
  document.documentElement.dataset.theme = initialTheme;

  window.addEventListener('DOMContentLoaded', () => {
    createSwitcher();
    updateThemeUi(initialTheme);

    document.addEventListener('click', (event) => {
      if (!event.target.closest('#themeSwitcher')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  });
})();
