/**
 * Sprout Craft Engineering Cookbook
 * Recipe #06: Const Assertions & Tuple-to-Union Derivation
 *
 * Problem: Repeating string literals in both TypeScript types and runtime arrays
 * (e.g. for validation or dropdown options) violates DRY.
 */

export const SUPPORTED_LOCALES = ['en-US', 'zh-CN', 'ja-JP', 'de-DE'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

// --- Usage Example ---
export function setLanguage(lang: SupportedLocale): void {
  console.log(`System locale updated to: ${lang}`);
}
