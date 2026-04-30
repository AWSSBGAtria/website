import { EventsPageContent } from "@/components/events/events-page-content";
import { getEventsCatalog } from "@/lib/meetup-events";

export default async function EventsPage() {
  const events = await getEventsCatalog();

  return <EventsPageContent events={events} />;
}
