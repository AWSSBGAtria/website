import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuilderWallPostsGrid } from "@/components/builder-wall/builder-wall-posts-grid";
import {
  builderWallCustomEvents,
  builderWallPostsByEventId,
  resolveBuilderWallPosts,
} from "@/lib/builder-wall-data";
import { getEventsCatalog } from "@/lib/meetup-events";

export const metadata: Metadata = {
  title: "Event Posts | The Builder Wall",
  description:
    "Community posts from AWS Student Builder Group events at Atria Institute of Technology.",
};

export default async function BuilderWallEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId: routeId } = await params;

  if (routeId.startsWith("custom-")) {
    const customEvent = builderWallCustomEvents.find(
      (candidate) => `custom-${candidate.id}` === routeId,
    );
    if (!customEvent) notFound();

    return (
      <BuilderWallPostsGrid
        eventId={customEvent.id}
        eventTitle={customEvent.title}
        eventDate={customEvent.date}
        sourceLabel="Custom event"
        sourceUrl={customEvent.eventUrl}
        posts={resolveBuilderWallPosts(customEvent.posts)}
      />
    );
  }

  const events = await getEventsCatalog();
  const event = events.find((meetupEvent) => meetupEvent.id === routeId);

  if (!event) notFound();

  return (
    <BuilderWallPostsGrid
      eventId={event.id}
      eventTitle={event.title}
      eventDate={event.date}
      sourceLabel="Meetup event"
      sourceUrl={event.link}
      posts={resolveBuilderWallPosts(builderWallPostsByEventId[event.id] ?? [])}
    />
  );
}
