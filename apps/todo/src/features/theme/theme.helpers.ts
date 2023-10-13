import { DEFAULT_THEME } from '@theme/theme.constants';
import { ThemeType } from '@theme/theme.types';
import { getSession } from '@users/users.helpers';

export const getTheme = async (): Promise<ThemeType> => (await getSession())?.user.theme ?? DEFAULT_THEME;
