import type { ReactNode } from 'react';
import V3LocaleLayout from '../../components/v3/V3LocaleLayout';

export default function V3EnglishLayout({ children }: { children: ReactNode }) {
  return <V3LocaleLayout locale="en">{children}</V3LocaleLayout>;
}
