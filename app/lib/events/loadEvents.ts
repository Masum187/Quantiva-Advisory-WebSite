import { unstable_cache } from 'next/cache';
import attendanceData from '../data/eventAttendance.json';
import { IT_EVENTS, type ItEvent } from '../data/itEvents';
import { getContentfulClient, isContentfulEnabled } from '../utils/contentful';

export interface ListedEvent extends ItEvent {
  attending: boolean;
}

const LOCAL_ATTENDANCE = attendanceData as Record<string, boolean>;

async function attendanceFromContentful(): Promise<Record<string, boolean>> {
  if (!isContentfulEnabled) return {};
  const client = getContentfulClient();
  if (!client) return {};

  try {
    const response = await client.getEntries({
      content_type: 'eventAttendance',
      limit: 100,
    });
    const overrides: Record<string, boolean> = {};
    for (const entry of response.items) {
      const fields = entry.fields as { eventSlug?: unknown; attending?: unknown };
      if (typeof fields.eventSlug === 'string') {
        overrides[fields.eventSlug] = fields.attending === true;
      }
    }
    return overrides;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!/unknownContentType|unknown content type/i.test(message)) {
      console.error('eventAttendance', error);
    }
    return {};
  }
}

async function loadItEvents(): Promise<ListedEvent[]> {
  const remote = await attendanceFromContentful();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return IT_EVENTS.map((event) => ({
    ...event,
    attending: remote[event.slug] ?? LOCAL_ATTENDANCE[event.slug] ?? false,
  }))
    .filter((event) => new Date(`${event.end}T23:59:59`) >= today)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function getItEvents(): Promise<ListedEvent[]> {
  return unstable_cache(loadItEvents, ['it-events-v2'], {
    tags: ['events'],
    revalidate: 60,
  })();
}
