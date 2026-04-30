export type MeetupEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  startsAt: string | null;
  location: string;
  type: string;
  link: string;
  description: string;
  image: string | null;
};

const GQL_ENDPOINT = "https://www.meetup.com/gql2";
const GROUP_URLNAME = "aws-cloud-club-at-atria-inst-of-tech";

const HASHES = {
  upcoming: "29367d3079b76c813351939b4b74a273299778a57497d39369d12d4d68e5976b",
  past: "321388b1e4a11b17a57efe3ae7a90abfecbc703a4f4e99519772294924c21351",
};

function formatDateParts(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return {
      date: "Date TBA",
      time: "Time TBA",
    };
  }

  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(date),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    }).format(date),
  };
}

function mapGqlEvent(node: any): MeetupEvent {
  const { date, time } = formatDateParts(node.dateTime);
  
  // Clean up description (remove HTML tags)
  const plainDescription = node.description
    ? node.description
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "Event details will be available on Meetup.";

  return {
    id: node.id,
    title: node.title || "Untitled Event",
    date,
    time,
    startsAt: node.dateTime,
    location: node.venue?.name || (node.isOnline ? "Online Event" : "Venue TBA"),
    type: node.eventType?.toLowerCase() || "meetup",
    link: node.eventUrl,
    description: plainDescription,
    image: node.image?.baseUrl || node.featuredEventPhoto?.baseUrl || null,
  };
}

async function fetchMeetupGql(operationName: string, hash: string, variables: any) {
  try {
    const response = await fetch(GQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName,
        variables,
        extensions: {
          persistedQuery: {
            version: 1,
            sha256Hash: hash,
          },
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Meetup GQL request failed: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data?.groupByUrlname?.events?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error(`Error fetching Meetup ${operationName}:`, error);
    return [];
  }
}

export async function getMeetupEvents() {
  const now = new Date().toISOString();
  const nodes = await fetchMeetupGql("getUpcomingGroupEvents", HASHES.upcoming, {
    urlname: GROUP_URLNAME,
    afterDateTime: now,
  });
  return nodes.map(mapGqlEvent);
}

export async function getPastEvents() {
  const now = new Date().toISOString();
  const nodes = await fetchMeetupGql("getPastGroupEvents", HASHES.past, {
    urlname: GROUP_URLNAME,
    beforeDateTime: now,
  });
  return nodes.map(mapGqlEvent);
}

export async function getEventsCatalog() {
  const [upcoming, past] = await Promise.all([getMeetupEvents(), getPastEvents()]);
  
  // Return all events, sorted by date (newest first)
  return [...upcoming, ...past].sort((a, b) => {
    const dateA = a.startsAt ? new Date(a.startsAt).getTime() : 0;
    const dateB = b.startsAt ? new Date(b.startsAt).getTime() : 0;
    return dateB - dateA;
  });
}
