export const ACCENT = '#D43444';
export const ACCENT_HOVER = '#b02c38';

export const getTheme = (isDark: boolean) => ({
  bg: isDark ? '#121212' : '#ffffff',
  bgAlt: isDark ? '#1C1C1C' : '#F8F8F8',
  cardBg: isDark ? '#1A1A1A' : '#ffffff',
  navBg: isDark ? 'rgba(18,18,18,0.96)' : 'rgba(255,255,255,0.96)',
  text: isDark ? '#F5F5F5' : '#2B2B2B',
  textMuted: isDark ? '#B0B0B0' : '#4B5563',
  textLight: isDark ? '#888888' : '#6B7280',
  border: isDark ? '#2D2D2D' : '#E5E7EB',
  inputBg: isDark ? '#242424' : '#ffffff',
  accent: ACCENT,
  accentHover: ACCENT_HOVER,
  isDark,
});

export type Theme = ReturnType<typeof getTheme>;