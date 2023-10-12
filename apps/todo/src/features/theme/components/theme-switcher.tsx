'use client';

import { RadioGroup } from '@common/components/ui/radio-group';
import { RadioGroupItem } from '@radix-ui/react-radio-group';
import { ThemeType } from '@theme/theme.types';
import { Circle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CSSProperties } from 'react';

const themes = [
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

export const ThemeSwitcher = () => {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();

  const handleChange = async (value: ThemeType) => {
    await updateSession({ userTheme: value });
    router.refresh();
  };

  return (
    <div className="flex gap-4 items-center py-2 px-3 bg-primary/25 rounded-md">
      <p>Theme</p>
      <RadioGroup
        key={session?.user.theme}
        defaultValue={session?.user.theme}
        onValueChange={handleChange}
        className="grid-cols-3"
      >
        {themes.map(({ theme, color }) => (
          <RadioGroupItem
            value={theme}
            key={theme}
            style={{ '--theme-color': color } as CSSProperties}
            className="aspect-square rounded-full outline-none grid place-content-center opacity-25 hover:opacity-75 transition-opacity data-[state='checked']:opacity-100"
          >
            <Circle className="h-4 w-4 fill-[var(--theme-color)] stroke-none" />
          </RadioGroupItem>
        ))}
      </RadioGroup>
    </div>
  );
};
