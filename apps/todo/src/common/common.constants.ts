import { ThemeType } from '@common/common.types';

export const IS_SERVER = typeof window === 'undefined';

export const DEFAULT_THEME = ThemeType.Dark;
export const THEMES = [
  {
    theme: ThemeType.Dark,
    color: '#000',
  },
  {
    theme: ThemeType.Light,
    color: '#FFF',
  },
  {
    theme: ThemeType.DarkBlue,
    color: '#3B82F6',
  },
];
