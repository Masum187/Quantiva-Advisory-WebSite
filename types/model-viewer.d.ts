import type React from 'react';

type ModelViewerAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    poster?: string;
    alt?: string;
    'camera-controls'?: boolean;
    'auto-rotate'?: boolean;
    'auto-rotate-delay'?: number;
    'rotation-per-second'?: string;
    'shadow-intensity'?: string;
    'shadow-softness'?: string;
    'environment-image'?: string;
    'tone-mapping'?: string;
    'camera-orbit'?: string;
    'touch-action'?: string;
    'interaction-prompt'?: string;
    'disable-zoom'?: boolean;
    exposure?: string;
    loading?: string;
    reveal?: string;
  },
  HTMLElement
>;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}

export {};
