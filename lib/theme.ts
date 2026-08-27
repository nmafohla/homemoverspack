export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "hmp-theme";

/**
 * Applies the stored theme before the first paint.
 *
 * This runs as a blocking inline script in the document head, ahead of any
 * markup. Doing it from React instead would paint the default theme, then
 * repaint — the flash of the wrong background that every themed site has to
 * design around. It writes only a class on <html>, which both stylesheets
 * (the original design's and the redesign's) key their `dark:` variants off,
 * so one script serves both sites.
 *
 * Everything is wrapped in try/catch: localStorage throws outright in some
 * privacy modes, and a theme preference is never worth breaking a page over.
 */
export const THEME_BOOTSTRAP = `(function(){try{
var t=localStorage.getItem('${THEME_STORAGE_KEY}');
var d=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);
document.documentElement.classList.toggle('dark',d);
}catch(e){}})()`;

/** Reads the stored preference, falling back to "system". */
export function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // Storage unavailable — treat it as no preference set.
  }
  return "system";
}

/** Persists a preference and applies it to the document immediately. */
export function applyTheme(theme: Theme): void {
  try {
    if (theme === "system") {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Non-persistent is still better than not switching at all.
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", isDark);
}

/* ------------------------------------------------------------------
   A minimal store so components can read the preference through
   useSyncExternalStore. That keeps the value consistent across every
   toggle on the page, stays correct if another tab changes it, and
   avoids reading browser state inside an effect.
   ------------------------------------------------------------------ */
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

export function subscribeToTheme(callback: () => void): () => void {
  listeners.add(callback);
  // `storage` only fires in *other* tabs, so setTheme notifies this one directly.
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function getThemeSnapshot(): Theme {
  return readStoredTheme();
}

/** The server has no preference to read; "system" matches the bootstrap default. */
export function getThemeServerSnapshot(): Theme {
  return "system";
}

/** Sets the preference, applies it, and tells every subscriber in this tab. */
export function setTheme(theme: Theme): void {
  applyTheme(theme);
  notify();
}
