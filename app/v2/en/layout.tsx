import ForgeLocaleLayout from '../../components/forge/ForgeLocaleLayout';

export default function V2EnLayout({ children }: { children: React.ReactNode }) {
  return <ForgeLocaleLayout locale="en">{children}</ForgeLocaleLayout>;
}
