export const ThemeType = {
  Dark: 'dark',
  Light: 'light',
  DarkBlue: 'dark-blue',
} as const;
export type ThemeType = (typeof ThemeType)[keyof typeof ThemeType];
