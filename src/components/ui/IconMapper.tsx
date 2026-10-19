import React from "react";
import { PlatformType } from "@/lib/types";

interface IconMapperProps {
  platform: PlatformType | string;
  className?: string;
}

export const IconMapper: React.FC<IconMapperProps> = ({ platform, className = "w-6 h-6" }) => {
  const norm = platform.toLowerCase();

  switch (norm) {
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#1DB954" />
          <path
            d="M16.5 15.6a.65.65 0 01-.9.22c-2.45-1.5-5.54-1.84-9.17-1a.65.65 0 11-.27-1.27c4-.93 7.42-.53 10.12 1.13.3.18.4.58.22.92zm1.2-2.7a.8.8 0 01-1.1.27c-2.8-1.72-7.07-2.22-10.38-1.22a.81.81 0 11-.47-1.55c3.78-1.15 8.5-.6 11.68 1.37a.82.82 0 01.27 1.13zm.1-2.8c-3.36-2-8.9-2.18-12.1-1.2a.98.98 0 11-.56-1.88c3.7-1.13 9.8-.9 13.68 1.4a.98.98 0 01-1.02 1.68z"
            fill="#ffffff"
          />
        </svg>
      );

    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 002.42 7.2 26.2 26.2 0 002 12a26.2 26.2 0 00.42 4.81 2.5 2.5 0 001.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 001.76-1.77A26.2 26.2 0 0022 12a26.2 26.2 0 00-.42-4.81z"
            fill="#FF0000"
          />
          <polygon points="10,15 15.5,12 10,9" fill="#ffffff" />
        </svg>
      );

    case "applemusic":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="amGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FA243C" />
              <stop offset="100%" stopColor="#FC3C44" />
            </linearGradient>
          </defs>
          <rect width="24" height="24" rx="5.5" fill="url(#amGrad)" />
          <path
            d="M16.5 6.2v8.5a2.8 2.8 0 11-2.5-2.8V8.6l-5 1.1v6a2.8 2.8 0 11-2.5-2.8V7.5a.8.8 0 01.6-.77l7.8-1.7a.8.8 0 011 .77v.4z"
            fill="#ffffff"
          />
        </svg>
      );

    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <path
            d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2.5a1 1 0 110 2 1 1 0 010-2z"
            fill="url(#igGrad)"
          />
        </svg>
      );

    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.82.12V9a6.33 6.33 0 00-.82-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.41a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.84z"
            fill="#25F4EE"
          />
          <path
            d="M18.59 5.69a4.83 4.83 0 01-3.77-4.25V1h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.82.12V8a6.33 6.33 0 00-.82-.05 6.34 6.34 0 00-6.34 6.35 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.41a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.84z"
            fill="#FE2C55"
          />
          <path
            d="M19.09 6.19a4.83 4.83 0 01-3.77-4.25V1.5h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.82.12V8.5a6.33 6.33 0 00-.82-.05 6.34 6.34 0 00-6.34 6.35 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.91a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.84z"
            fill="#000000"
          />
        </svg>
      );

    case "twitter":
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#000000" />
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="#ffffff"
          />
        </svg>
      );

    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            fill="#1877F2"
          />
        </svg>
      );

    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
            fill="#0A66C2"
          />
        </svg>
      );

    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#25D366" />
          <path
            d="M17.5 14.38c-.28-.14-1.63-.8-1.88-.89-.25-.09-.43-.14-.62.14-.18.28-.71.89-.87 1.07-.16.18-.32.2-.6.07-.28-.14-1.19-.44-2.26-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.3s.98 2.67 1.12 2.86c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.25.18 1.73.11.53-.08 1.63-.67 1.86-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.19-.53-.33z"
            fill="#ffffff"
          />
        </svg>
      );

    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#229ED9" />
          <path
            d="M7.4 11.8l7.6-3.2c.4-.2.7.1.5.7l-1.3 6.1c-.2.9-.7 1.1-1.4.7l-2.1-1.5-1 1c-.1.1-.2.2-.4.2l.1-2.1 3.9-3.5c.2-.2 0-.3-.3-.1l-4.8 3-2-.6c-.5-.1-.5-.5.1-.7z"
            fill="#ffffff"
          />
        </svg>
      );

    case "messenger":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="msgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B2FF" />
              <stop offset="50%" stopColor="#006AFF" />
              <stop offset="100%" stopColor="#9B00E8" />
            </linearGradient>
          </defs>
          <path
            d="M12 2C6.48 2 2 6.13 2 11.23c0 2.91 1.45 5.51 3.72 7.15V22l3.47-1.91c.89.25 1.83.38 2.81.38 5.52 0 10-4.13 10-9.24C22 6.13 17.52 2 12 2zm1.04 12.44l-2.58-2.75-5.04 2.75 5.54-5.88 2.65 2.75 4.97-2.75-5.54 5.88z"
            fill="url(#msgGrad)"
          />
        </svg>
      );

    case "shopee":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#EE4D2D" />
          <path
            d="M12 4.5c-2 0-3 1.2-3 2.5h1.5c0-.7.6-1.2 1.5-1.2s1.5.5 1.5 1.2c0 2.5-4.5 2-4.5 5.5 0 1.8 1.5 3 3 3s3-1.2 3-2.5h-1.5c0 .7-.6 1.2-1.5 1.2s-1.5-.5-1.5-1.2c0-2.5 4.5-2 4.5-5.5 0-1.8-1.5-3-3-3z"
            fill="#ffffff"
          />
        </svg>
      );

    case "lazada":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="5" fill="#0F146D" />
          <path
            d="M12 6l5 5-5 5-5-5 5-5z"
            fill="#F36F21"
          />
        </svg>
      );

    case "phone":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1v3.49a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"
            fill="#25D366"
          />
        </svg>
      );

    case "email":
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="16" x="2" y="4" rx="3" fill="#EA4335" />
          <path d="M4 6l8 6 8-6" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "website":
    case "globe":
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1a2 2 0 002 2v1.93zm6.9-2.54A1.99 1.99 0 0016 16h-1v-3a1 1 0 00-1-1H8v-2h2a1 1 0 001-1V7h2a2 2 0 002-2v-.41A7.997 7.997 0 0120 12c0 2.08-.8 3.97-2.1 5.39z"
            fill="#4C9AFF"
          />
        </svg>
      );
  }
};
