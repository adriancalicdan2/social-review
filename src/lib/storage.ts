import { Profile } from "./types";
import { DEFAULT_PROFILES } from "./defaultProfiles";
import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const STORAGE_KEY = "tmaker_profiles_v3";

// Reserved URLs that can never be claimed as a profile slug
export const RESERVED_SLUGS = [
  "dashboard",
  "editor",
  "login",
  "api",
  "templates",
  "settings",
  "admin",
  "public",
  "favicon",
  "sitemap",
  "robots",
  "terms",
  "privacy",
  "pricing",
  "about",
];

// In-memory cache for server-side or fallback rendering
let inMemoryProfiles: Profile[] = [...DEFAULT_PROFILES];

function getLocalProfiles(): Profile[] {
  if (typeof window === "undefined") {
    return inMemoryProfiles;
  }
  try {
    // Purge older caches to ensure updated avatars and configurations
    localStorage.removeItem("tmaker_profiles_v1");
    localStorage.removeItem("tmaker_profiles_v2");

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILES));
      return DEFAULT_PROFILES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure updated aura logo is applied
      const updated = parsed.map((p) => {
        if (p.slug === "aura" && p.avatarUrl === "/image.png") {
          return { ...p, avatarUrl: "/aura-logo.svg" };
        }
        return p;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    }
    return DEFAULT_PROFILES;
  } catch (err) {
    console.error("Error reading localStorage profiles:", err);
    return DEFAULT_PROFILES;
  }
}

function saveLocalProfiles(profiles: Profile[]): void {
  inMemoryProfiles = profiles;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }
}

export async function getProfiles(): Promise<Profile[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "profiles"));
      const list: Profile[] = [];
      snap.forEach((d) => list.push(d.data() as Profile));
      if (list.length > 0) return list;
    } catch (err) {
      console.warn("Firestore getProfiles note, using local/defaults:", err);
    }
  }
  return getLocalProfiles();
}

export async function getProfileById(id: string): Promise<Profile | null> {
  const defaultMatch = DEFAULT_PROFILES.find((p) => p.id === id);
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "profiles", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) return snap.data() as Profile;
    } catch (err) {
      console.warn("Firestore getProfileById note, using local/defaults:", err);
    }
  }
  const profiles = getLocalProfiles();
  return profiles.find((p) => p.id === id) || defaultMatch || null;
}

export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  const cleanSlug = slug.toLowerCase().trim();
  const defaultMatch = DEFAULT_PROFILES.find((p) => p.slug.toLowerCase() === cleanSlug);

  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "profiles"), where("slug", "==", cleanSlug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs[0].data() as Profile;
      }
    } catch (err) {
      console.warn("Firestore getProfileBySlug note, using local/defaults:", err);
    }
  }
  const profiles = getLocalProfiles();
  const found = profiles.find((p) => p.slug.toLowerCase() === cleanSlug);
  return found || defaultMatch || null;
}

export async function isSlugAvailable(
  slug: string,
  excludeProfileId?: string
): Promise<boolean> {
  const cleanSlug = slug.toLowerCase().trim();
  if (RESERVED_SLUGS.includes(cleanSlug)) return false;

  const profiles = await getProfiles();
  const existing = profiles.find(
    (p) => p.slug.toLowerCase() === cleanSlug && p.id !== excludeProfileId
  );
  return !existing;
}

export async function saveProfile(profile: Profile): Promise<Profile> {
  const now = new Date().toISOString();
  const updated: Profile = {
    ...profile,
    slug: profile.slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, ""),
    updatedAt: now,
    publishedAt:
      profile.status === "published"
        ? profile.publishedAt || now
        : profile.publishedAt,
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "profiles", updated.id), updated);
    } catch (err) {
      console.error("Firestore setDoc failed:", err);
    }
  }

  const profiles = getLocalProfiles();
  const index = profiles.findIndex((p) => p.id === updated.id);
  if (index >= 0) {
    profiles[index] = updated;
  } else {
    profiles.unshift(updated);
  }
  saveLocalProfiles(profiles);

  return updated;
}

export async function deleteProfile(id: string): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "profiles", id));
    } catch (err) {
      console.error("Firestore deleteDoc failed:", err);
    }
  }

  const profiles = getLocalProfiles().filter((p) => p.id !== id);
  saveLocalProfiles(profiles);
  return true;
}

export async function duplicateProfile(id: string): Promise<Profile | null> {
  const original = await getProfileById(id);
  if (!original) return null;

  const newId = `profile-${Date.now()}`;
  let newSlug = `${original.slug}-copy`;
  let counter = 1;

  while (!(await isSlugAvailable(newSlug))) {
    newSlug = `${original.slug}-copy-${counter++}`;
  }

  const duplicated: Profile = {
    ...original,
    id: newId,
    slug: newSlug,
    name: `${original.name} (Copy)`,
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: undefined,
  };

  return await saveProfile(duplicated);
}
