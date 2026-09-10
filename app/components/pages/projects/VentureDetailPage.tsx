'use client';

/**
 * Dispatcher: Jedes Venture hat ein eigenständiges Seitenlayout.
 *
 * - SolutionGate  → „Pipeline“ (horizontaler Sticky-Scroll-Flow)
 * - ShiftGate AI  → „Evidence Terminal“ (monochrom, Case Files, Hash-Chain)
 * - LUMENA AI     → „Audit Scan“ (Checkliste, Glas-Tiles, Sticky-Split)
 * - Procuvera     → „Control Tower“ (Flag-Board, KPI-Grid, Stepper)
 * - LIMEN         → „Schwelle“ (Split-Hero, Regelpfad, Ergebniszustände)
 * - Veya          → „Editorial Ascent“ (monochrom, Treppen-Flow, Constitution)
 * - Nuvora        → „Layer Stack“ (Sticky-Stack R1–R7, Architecture Contract)
 * - WEFTLINE      → „Weave“ (Poster-Hero, Faden-Flow, Grün-vs-Realität)
 */

import React from 'react';
import type { Venture } from '../../../lib/data/projects';
import SolutionGateLayout from './detail/SolutionGateLayout';
import ShiftGateLayout from './detail/ShiftGateLayout';
import LumenaLayout from './detail/LumenaLayout';
import ProcuveraLayout from './detail/ProcuveraLayout';
import LimenLayout from './detail/LimenLayout';
import VeyaLayout from './detail/VeyaLayout';
import NuvoraLayout from './detail/NuvoraLayout';
import WeftlineLayout from './detail/WeftlineLayout';

const LAYOUTS: Record<string, React.ComponentType<{ venture: Venture; next: Venture }>> = {
  solutiongate: SolutionGateLayout,
  shiftgate: ShiftGateLayout,
  lumena: LumenaLayout,
  procuvera: ProcuveraLayout,
  limen: LimenLayout,
  veya: VeyaLayout,
  nuvora: NuvoraLayout,
  weftline: WeftlineLayout,
};

export default function VentureDetailPage({
  venture,
  next,
}: {
  venture: Venture;
  next: Venture;
}) {
  const Layout = LAYOUTS[venture.slug] ?? SolutionGateLayout;
  return <Layout venture={venture} next={next} />;
}
