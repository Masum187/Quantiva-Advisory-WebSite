type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Server-only JSON-LD. Renders in the first HTML — do not mark as a client component. */
export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
