import { authOptions } from '@auth/auth.options';
import { DEFAULT_THEME } from '@theme/theme.constants';
import { ThemeType } from '@theme/theme.types';
import { getServerSession } from 'next-auth';

export const getTheme = async (): Promise<ThemeType> =>
  (await getServerSession(authOptions))?.user.theme ?? DEFAULT_THEME;
