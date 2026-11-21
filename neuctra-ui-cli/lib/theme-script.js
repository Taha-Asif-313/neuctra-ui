// Same output as getThemeScript() in @neuctra/ui. It is generated here as a
// plain string because a Next.js root layout is a Server Component and cannot
// call functions exported from the library's client bundle.
export const DEFAULT_STORAGE_KEY = "neuctra-theme";

export const getThemeScript = ({ storageKey = DEFAULT_STORAGE_KEY, defaultMode = "system" } = {}) =>
  `(function(){try{var m=null;try{m=localStorage.getItem(${JSON.stringify(storageKey)})}catch(e){}if(m!=="light"&&m!=="dark"&&m!=="system")m=${JSON.stringify(defaultMode)};var d=m==="dark"||(m==="system"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})();`;

export const SCRIPT_MARKER = "neuctra-theme-script";
