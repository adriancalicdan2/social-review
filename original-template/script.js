/* ============================================================
   NFC Landing Page — Configuration & Renderer
   ============================================================
   INSTRUCTIONS:
   ► Edit the CONFIG object below to customise for each client.
   ► Set "active: false" on any link to hide it.
   ► The page will auto-render from this config — no HTML editing
     needed for day-to-day client changes.
   ============================================================ */

// ──────────────────────────────────────────────
// █  CLIENT CONFIGURATION — KAIA OFFICIAL HUB
// ──────────────────────────────────────────────

const CONFIG = {

  // ── Artist / Group Details ────────────────
  businessName: "KAIA",
  subtitle: "Angela • Charice • Alexa • Sophia • Charlotte",
  bio: "Filipino P-pop girl group under Sony Music Philippines & ShowBT. Defining inner character (kinaiya) and power (kaya). Home of ZAIA",
  logoUrl: "https://i.scdn.co/image/ab6761610000e5eb97f681f8e6e1d04f5b7867d2",

  // ── Links (Music, Socials, Community) ─────
  links: [
    {
      name: "Listen on Spotify",
      url: "https://open.spotify.com/artist/5UWPjwwieMFFohWLHe4Usy",
      appUrl: {
        android: "intent://artist/5UWPjwwieMFFohWLHe4Usy#Intent;package=com.spotify.music;scheme=spotify;S.browser_fallback_url=https%3A%2F%2Fopen.spotify.com%2Fartist%2F5UWPjwwieMFFohWLHe4Usy;end;"
      },
      icon: "spotify",
      active: true,
      highlight: true,
      badge: "★ LATEST MUSIC",
      category: "music"
    },
    {
      name: "YouTube Official Channel",
      url: "https://www.youtube.com/@KAIAOfficialph",
      icon: "youtube",
      active: true,
      highlight: true,
      badge: "MV & EXCLUSIVES",
      category: "music"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/us/artist/kaia/1598737749",
      icon: "applemusic",
      active: true,
      highlight: false,
      badge: null,
      category: "music"
    },
    {
      name: "Instagram (@kaia.officialph)",
      url: "https://www.instagram.com/kaia.officialph/",
      appUrl: {
        android: "intent://instagram.com/_u/kaia.officialph#Intent;package=com.instagram.android;scheme=https;S.browser_fallback_url=https%3A%2F%2Fwww.instagram.com%2Fkaia.officialph%2F;end;"
      },
      icon: "instagram",
      active: true,
      highlight: false,
      badge: null,
      category: "social"
    },
    {
      name: "TikTok (@kaiaofficialph)",
      url: "https://www.tiktok.com/@kaiaofficialph",
      icon: "tiktok",
      active: true,
      highlight: false,
      badge: null,
      category: "social"
    },
    {
      name: "X / Twitter (@KAIAOfficialPH)",
      url: "https://twitter.com/KAIAOfficialPH",
      icon: "twitter",
      active: true,
      highlight: false,
      badge: null,
      category: "social"
    },
    {
      name: "Facebook (KAIA Official)",
      url: "https://www.facebook.com/OfficialKAIA",
      icon: "facebook",
      active: true,
      highlight: false,
      badge: null,
      category: "social"
    }
  ]
};

// ──────────────────────────────────────────────
// █  SVG ICON LIBRARY — FULL-COLOR BRAND LOGOS
// ──────────────────────────────────────────────

const ICONS = {

  // Spotify — Official Vibrant Green
  spotify: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#1DB954"/>
    <path d="M16.5 15.6a.65.65 0 01-.9.22c-2.45-1.5-5.54-1.84-9.17-1a.65.65 0 11-.27-1.27c4-.93 7.42-.53 10.12 1.13.3.18.4.58.22.92zm1.2-2.7a.8.8 0 01-1.1.27c-2.8-1.72-7.07-2.22-10.38-1.22a.81.81 0 11-.47-1.55c3.78-1.15 8.5-.6 11.68 1.37a.82.82 0 01.27 1.13zm.1-2.8c-3.36-2-8.9-2.18-12.1-1.2a.98.98 0 11-.56-1.88c3.7-1.13 9.8-.9 13.68 1.4a.98.98 0 01-1.02 1.68z" fill="#ffffff"/>
  </svg>`,

  // YouTube — Official Red & Play Button
  youtube: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 002.42 7.2 26.2 26.2 0 002 12a26.2 26.2 0 00.42 4.81 2.5 2.5 0 001.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 001.76-1.77A26.2 26.2 0 0022 12a26.2 26.2 0 00-.42-4.81z" fill="#FF0000"/>
    <polygon points="10,15 15.5,12 10,9" fill="#ffffff"/>
  </svg>`,

  // Apple Music — Official Magenta Gradient
  applemusic: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="amGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FA243C"/>
        <stop offset="100%" stop-color="#FC3C44"/>
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5.5" fill="url(#amGrad)"/>
    <path d="M16.5 6.2v8.5a2.8 2.8 0 11-2.5-2.8V8.6l-5 1.1v6a2.8 2.8 0 11-2.5-2.8V7.5a.8.8 0 01.6-.77l7.8-1.7a.8.8 0 011 .77v.4z" fill="#ffffff"/>
  </svg>`,

  // X / Twitter
  twitter: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#000000"/>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#ffffff"/>
  </svg>`,

  // Google "G" — official 4-color logo
  google: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09A6.97 6.97 0 015.48 12c0-.72.13-1.43.36-2.09V7.07H2.18A11.01 11.01 0 001 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>`,

  // Facebook — official blue
  facebook: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2"/>
  </svg>`,

  // Instagram — gradient (purple → pink → orange → yellow)
  instagram: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig1" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stop-color="#fdf497"/>
        <stop offset="5%" stop-color="#fdf497"/>
        <stop offset="45%" stop-color="#fd5949"/>
        <stop offset="60%" stop-color="#d6249f"/>
        <stop offset="90%" stop-color="#285AEB"/>
      </radialGradient>
    </defs>
    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.5a1 1 0 110 2 1 1 0 010-2z" fill="url(#ig1)"/>
  </svg>`,

  // TikTok — official black + cyan + pink layered
  tiktok: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.82.12V9a6.33 6.33 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.41a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.84z" fill="#25F4EE"/>
    <path d="M18.59 5.69a4.83 4.83 0 01-3.77-4.25V1h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.82.12V8a6.33 6.33 0 00-.82-.05 6.34 6.34 0 00-6.34 6.35 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.41a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.84z" fill="#FE2C55"/>
    <path d="M19.09 6.19a4.83 4.83 0 01-3.77-4.25V1.5h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.82.12V8.5a6.33 6.33 0 00-.82-.05 6.34 6.34 0 00-6.34 6.35 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.91a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.84z" fill="#000000"/>
  </svg>`,

  // Klook — official orange
  klook: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FF5722"/>
    <text x="12" y="16.5" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="10" fill="#fff">K</text>
  </svg>`,

  // Trip.com — official blue
  trip: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#287DFA"/>
    <text x="12" y="16" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="8" fill="#fff">Trip</text>
  </svg>`,

  // Phone — green call icon
  phone: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1v3.49a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" fill="#25D366"/>
  </svg>`,

  // Globe — blue website icon
  globe: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1a2 2 0 002 2v1.93zm6.9-2.54A1.99 1.99 0 0016 16h-1v-3a1 1 0 00-1-1H8v-2h2a1 1 0 001-1V7h2a2 2 0 002-2v-.41A7.997 7.997 0 0120 12c0 2.08-.8 3.97-2.1 5.39z" fill="#4C9AFF"/>
  </svg>`,

  // Chevron arrow (keeps currentColor for theme)
  chevron: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.42 1.42l4.59-4.59a1 1 0 000-1.42L10.71 6.7a1 1 0 00-1.42.01z" fill="currentColor"/></svg>`
};

// ──────────────────────────────────────────────
// █  RENDERER — DO NOT EDIT BELOW THIS LINE
// ──────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
  renderLinks();
});

/**
 * Render the profile / header section from CONFIG.
 */
function renderProfile() {
  const section = document.getElementById('profile-section');
  if (!section) return;

  // Logo / avatar image
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'profile-image-wrapper';

  const img = document.createElement('img');
  img.className = 'profile-image';
  img.alt = CONFIG.businessName + ' official photo';

  if (CONFIG.logoUrl) {
    img.src = CONFIG.logoUrl;
    imgWrapper.style.cursor = 'pointer';
    imgWrapper.title = 'Tap to view photo';
    imgWrapper.addEventListener('click', () => openLightbox(CONFIG.logoUrl, CONFIG.businessName));
  } else {
    img.src = generateLetterAvatar(CONFIG.businessName);
  }
  imgWrapper.appendChild(img);

  // Group name
  const heading = document.createElement('h1');
  heading.className = 'business-name';
  heading.textContent = CONFIG.businessName;

  // Subtitle (Members pill badge)
  const subtitle = document.createElement('div');
  subtitle.className = 'group-members-pill';
  subtitle.textContent = CONFIG.subtitle || 'Angela • Charice • Alexa • Sophia • Charlotte';

  // Bio
  const bio = document.createElement('p');
  bio.className = 'business-bio';
  bio.textContent = CONFIG.bio;

  section.append(imgWrapper, heading, subtitle, bio);
}

/**
 * Render link buttons from CONFIG.links — only active links are shown.
 */
function renderLinks() {
  const musicSection = document.getElementById('music-section');
  const socialSection = document.getElementById('social-section');
  const contactSection = document.getElementById('contact-section');

  const activeLinks = CONFIG.links.filter(link => link.active);
  const musicLinks = activeLinks.filter(link => link.category === 'music');
  const socialLinks = activeLinks.filter(link => link.category === 'social');
  const contactLinks = activeLinks.filter(link => link.category === 'contact');

  // Render section label + buttons
  function renderGroup(links, container, labelText, startIndex) {
    if (!container || links.length === 0) return;

    // Section heading label
    const sectionLabel = document.createElement('p');
    sectionLabel.className = 'section-label';
    sectionLabel.textContent = labelText;
    container.appendChild(sectionLabel);

    links.forEach((link, i) => {
      const index = startIndex + i;
      const anchor = document.createElement('a');
      anchor.href = link.url;

      // On mobile devices, opening in _self without rel="noopener noreferrer"
      // allows iOS Universal Links and Android App Links to directly hand off to native apps (YouTube, Spotify, etc.)
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (link.url.startsWith('tel:')) {
        anchor.target = '_self';
      } else if (isMobile) {
        anchor.target = '_self';
      } else {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      }

      anchor.className = 'link-btn' + (link.highlight ? ' highlight' : '');
      anchor.style.animationDelay = `${0.12 + index * 0.05}s`;

      // Icon
      const iconSpan = document.createElement('span');
      iconSpan.className = 'btn-icon';
      iconSpan.innerHTML = ICONS[link.icon] || ICONS.globe;

      // Label
      const label = document.createElement('span');
      label.className = 'btn-label';
      label.textContent = link.name;

      // Optional badge
      if (link.badge) {
        const badge = document.createElement('span');
        badge.className = 'star-label';
        badge.textContent = link.badge;
        label.appendChild(badge);
      }

      // Chevron arrow
      const arrow = document.createElement('span');
      arrow.className = 'btn-arrow';
      arrow.innerHTML = ICONS.chevron;

      anchor.append(iconSpan, label, arrow);

      // Ripple effect & Android intent routing
      anchor.addEventListener('click', (e) => {
        createRipple(e, anchor);

        // On Android, use intent:// to directly launch apps cleanly
        const isAndroid = /Android/i.test(navigator.userAgent);
        if (isAndroid && link.appUrl && link.appUrl.android) {
          e.preventDefault();
          window.location.href = link.appUrl.android;
        }
        // On iOS & Desktop, allow standard natural navigation without annoying prompt dialogs
      });

      container.appendChild(anchor);
    });
  }

  renderGroup(musicLinks, musicSection, 'Music & Releases', 0);
  renderGroup(socialLinks, socialSection, 'Official Socials', musicLinks.length);
  renderGroup(contactLinks, contactSection, 'Connect & Fan Hub', musicLinks.length + socialLinks.length);
}

/**
 * Creates a material-style ripple on the clicked element.
 */
function createRipple(event, element) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

  element.appendChild(ripple);

  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
}

/**
 * Generate a simple canvas-based letter avatar when no logo URL is provided.
 */
function generateLetterAvatar(name) {
  const canvas = document.createElement('canvas');
  canvas.width = 220;
  canvas.height = 220;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 220, 220);
  gradient.addColorStop(0, '#6c63ff');
  gradient.addColorStop(1, '#a78bfa');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(110, 110, 110, 0, Math.PI * 2);
  ctx.fill();

  // Letter
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, 110, 115);

  return canvas.toDataURL('image/png');
}

/**
 * Open a fullscreen lightbox to view the avatar photo larger.
 */
function openLightbox(src, alt) {
  // Backdrop
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  // Image
  const img = document.createElement('img');
  img.className = 'lightbox-image';
  img.src = src;
  img.alt = alt || 'Photo';

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label', 'Close');

  overlay.append(img, closeBtn);
  document.body.appendChild(overlay);

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });

  // Close handlers
  function closeLightbox() {
    overlay.classList.remove('active');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') {
      closeLightbox();
      document.removeEventListener('keydown', handler);
    }
  });
}
