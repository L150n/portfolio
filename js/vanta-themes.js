// Vanta.js Theme Manager
// Manages 4 animated background themes with matching color schemes

(function () {
  'use strict';

  const THEMES = {
    clouds: {
      name: 'Clouds',
      icon: '☁️',
      vantaEffect: 'CLOUDS',
      accent: '#4facfe',
      accentHover: '#6fbbff',
      accentGlow: 'rgba(79, 172, 254, 0.3)',
      bgPrimary: '#0a0a1a',
      bgSecondary: '#0f0f24',
      scrollbar: '#4facfe',
      vantaConfig: {
        skyColor: 0x0a0a2e,
        cloudColor: 0x1a3a5c,
        cloudShadowColor: 0x061224,
        sunColor: 0x4facfe,
        sunGlareColor: 0x4facfe,
        sunlightColor: 0x3a8fd4,
        speed: 1.2,
        texturePath: undefined
      }
    },
    birds: {
      name: 'Birds',
      icon: '🐦',
      vantaEffect: 'BIRDS',
      accent: '#f5576c',
      accentHover: '#ff7088',
      accentGlow: 'rgba(245, 87, 108, 0.3)',
      bgPrimary: '#0f0a14',
      bgSecondary: '#1a0f22',
      scrollbar: '#f5576c',
      vantaConfig: {
        backgroundColor: 0x0f0a14,
        color1: 0xf5576c,
        color2: 0xff8a5c,
        colorMode: 'lerp',
        birdSize: 1.2,
        wingSpan: 25,
        speedLimit: 4,
        separation: 60,
        alignment: 40,
        cohesion: 30,
        quantity: 4
      }
    },
    fog: {
      name: 'Fog',
      icon: '🌫️',
      vantaEffect: 'FOG',
      accent: '#38ef7d',
      accentHover: '#5bff9a',
      accentGlow: 'rgba(56, 239, 125, 0.3)',
      bgPrimary: '#050f0a',
      bgSecondary: '#0a1a12',
      scrollbar: '#38ef7d',
      vantaConfig: {
        highlightColor: 0x1a6b3a,
        midtoneColor: 0x0a2e1a,
        lowlightColor: 0x030d08,
        baseColor: 0x050f0a,
        blurFactor: 0.6,
        speed: 1.5,
        zoom: 1.2
      }
    },
    cells: {
      name: 'Cells',
      icon: '🧬',
      vantaEffect: 'CELLS',
      accent: '#a855f7',
      accentHover: '#c084fc',
      accentGlow: 'rgba(168, 85, 247, 0.3)',
      bgPrimary: '#0a0515',
      bgSecondary: '#120a20',
      scrollbar: '#a855f7',
      vantaConfig: {
        color1: 0xa855f7,
        color2: 0x3b0764,
        size: 1.5,
        speed: 1.2,
        scale: 1.0
      }
    }
  };

  let currentVanta = null;
  let currentTheme = null;
  let soundSettings = { enabled: false, sounds: {} };
  let currentAudio = null;

  // Fetch sound settings from data.json
  function loadSoundSettings() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        if (data.themeSounds) {
          soundSettings = data.themeSounds;
        }
      })
      .catch(err => console.error("Error loading theme sounds:", err));
  }

  function playThemeSound(themeKey) {
    // Check if sounds are enabled and if a URL exists for the theme
    if (!soundSettings.enabled || !soundSettings.sounds[themeKey]) return;

    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Play new audio
    currentAudio = new Audio(soundSettings.sounds[themeKey]);
    currentAudio.volume = 0.5; // Adjust volume as needed
    currentAudio.play().catch(err => {
      // Browser might block autoplay without prior user interaction
      console.warn("Theme sound autoplay prevented:", err);
    });
  }

  function applyThemeColors(theme) {
    const root = document.documentElement;
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-hover', theme.accentHover);
    root.style.setProperty('--accent-glow', theme.accentGlow);
    root.style.setProperty('--bg-primary', theme.bgPrimary);
    root.style.setProperty('--bg-secondary', theme.bgSecondary);
    root.style.setProperty('--scrollbar-color', theme.scrollbar);
  }

  function initVanta(themeKey) {
    const theme = THEMES[themeKey];
    if (!theme) return;

    // Destroy previous instance
    if (currentVanta) {
      currentVanta.destroy();
      currentVanta = null;
    }

    const el = document.getElementById('vanta-bg');
    if (!el) return;

    // Apply CSS custom properties
    applyThemeColors(theme);
    currentTheme = themeKey;

    // Get the Vanta constructor
    const vantaConstructor = window.VANTA && window.VANTA[theme.vantaEffect];
    if (!vantaConstructor) {
      console.warn('Vanta effect not loaded:', theme.vantaEffect);
      return;
    }

    // Create Vanta instance
    const config = Object.assign({}, theme.vantaConfig, {
      el: el,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00
    });

    // Remove undefined properties
    Object.keys(config).forEach(key => {
      if (config[key] === undefined) delete config[key];
    });

    currentVanta = vantaConstructor(config);

    // Save preference
    try {
      localStorage.setItem('portfolio-vanta-theme', themeKey);
    } catch (e) { /* ignore */ }

    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === themeKey);
    });
  }

  function initThemeSwitcher() {
    const fab = document.getElementById('theme-fab');
    const options = document.getElementById('theme-options');

    if (!fab || !options) return;

    // Toggle panel
    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      options.classList.toggle('open');
      fab.classList.toggle('open');
    });

    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const themeKey = this.dataset.theme;
        if (themeKey && themeKey !== currentTheme) {
          initVanta(themeKey);
          playThemeSound(themeKey);
        }
        // Close panel after selection
        options.classList.remove('open');
        fab.classList.remove('open');
      });
    });

    // Close panel when clicking outside
    document.addEventListener('click', function () {
      options.classList.remove('open');
      fab.classList.remove('open');
    });

    document.getElementById('theme-switcher').addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    loadSoundSettings();
    initThemeSwitcher();

    // Load saved theme or default to clouds
    let savedTheme = 'clouds';
    try {
      const stored = localStorage.getItem('portfolio-vanta-theme');
      if (stored && THEMES[stored]) {
        savedTheme = stored;
      }
    } catch (e) { /* ignore */ }

    // Small delay to ensure Vanta scripts are loaded
    setTimeout(function () {
      initVanta(savedTheme);
    }, 100);
  });

  // Handle resize
  window.addEventListener('resize', function () {
    if (currentVanta && typeof currentVanta.resize === 'function') {
      currentVanta.resize();
    }
  });
})();
