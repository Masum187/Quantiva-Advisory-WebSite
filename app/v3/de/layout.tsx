import type { ReactNode } from 'react';
import V3LocaleLayout from '../../components/v3/V3LocaleLayout';

export default function V3GermanLayout({ children }: { children: ReactNode }) {
  return <V3LocaleLayout locale="de">{children}</V3LocaleLayout>;
}
