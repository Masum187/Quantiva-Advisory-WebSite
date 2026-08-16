import ForgeLocaleLayout from '../../components/forge/ForgeLocaleLayout';

export default function V2DeLayout({ children }: { children: React.ReactNode }) {
  return <ForgeLocaleLayout locale="de">{children}</ForgeLocaleLayout>;
}
