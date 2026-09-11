import type { Metadata } from 'next';
import AboutRedesign from '../../components/pages/about/AboutRedesign';

export const metadata: Metadata = {
  title: 'About us – Quantiva Advisory',
  description:
    'Proof statt Promise: Quantiva Advisory is a consultancy and venture studio under one roof. We guide transformation and build products that make decisions provable.',
};

export default function AboutPage() {
  return <AboutRedesign lang="en" />;
}
