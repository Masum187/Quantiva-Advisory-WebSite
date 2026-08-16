import { redirect } from 'next/navigation';

/** Forge variant root → German by default */
export default function V2RootPage() {
  redirect('/v2/de');
}
