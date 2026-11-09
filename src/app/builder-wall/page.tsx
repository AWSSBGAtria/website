import type { Metadata } from "next";
import { BuilderWallPageContent } from "@/components/builder-wall/builder-wall-page-content";
import {
  builderWallCustomEvents,
  builderWallPostsByEventId,
  resolveBuilderWallPosts,
} from "@/lib/builder-wall-data";
import { getEventsCatalog } from "@/lib/meetup-events";

export const metadata: Metadata = {
  title: "The Builder Wall | AWS Student Builder Group Atria",
  description:
    "The community, through your eyes. Explore LinkedIn posts shared by the AWS Student Builder Group at Atria.",
};

export default async function BuilderWallPage() {
  const meetupEvents = await getEventsCatalog();
  const events = [
    ...meetupEvents.map((event) => ({
      id: event.id,
      name: event.title,
      date: event.date,
      source: "Meetup" as const,
      posts: resolveBuilderWallPosts(builderWallPostsByEventId[event.id] ?? []),
    })),
    ...builderWallCustomEvents.map((event) => ({
      id: `custom-${event.id}`,
      name: event.title,
      date: event.date,
      source: "Custom" as const,
      posts: resolveBuilderWallPosts(event.posts),
    })),
  ];

  return <BuilderWallPageContent events={events} />;
}
