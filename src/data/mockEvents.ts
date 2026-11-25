/*
  MOCK DATA: replace with a real API call later.

  Every value written as {{name}} is a placeholder for dynamic data.
  The page highlights them in yellow so you can see what needs wiring.

  Event shape (what the backend should return; see the EventItem type below):
  {
    id:          string   unique id
    category:    "clubs" | "workshops" | "internships"
    title:       string   e.g. "WITS - Outreach Coordinator position"
    organizer:   string
    date:        string   e.g. "2026-12-04"
    time:        string   e.g. "6:00 PM" (optional)
    location:    string
    description: string
    link:        string   URL to apply / register
  }

  Later, in UpcomingEvents.tsx, swap the import for a fetch, e.g.:
    const [events, setEvents] = useState<EventItem[]>([]);
    useEffect(() => { fetch("/api/events").then(r => r.json()).then(setEvents); }, []);
*/

export type Category = "clubs" | "workshops" | "internships";

export type EventItem = {
  id: string;
  category: Category;
  title: string;
  organizer: string;
  date: string;
  time: string; // "" when there is no time (e.g. internships)
  location: string;
  description: string;
  link: string;
};

const placeholderEvent = {
  organizer: "{{organizer}}",
  date: "{{date}}",
  time: "{{time}}",
  location: "{{location}}",
  description: "{{eventDescription}}",
  link: "{{applyLink}}",
};

export const CATEGORIES: { key: Category; label: string; startOpen: boolean }[] = [
  { key: "clubs", label: "Clubs", startOpen: true },
  { key: "workshops", label: "Workshops", startOpen: false },
  { key: "internships", label: "Internships", startOpen: true },
];

export const mockEvents: EventItem[] = [
  { ...placeholderEvent, id: "evt-1", category: "clubs", title: "WITS - {{position}} position" },
  { ...placeholderEvent, id: "evt-2", category: "clubs", title: "{{eventTitle}}" },
  { ...placeholderEvent, id: "evt-3", category: "workshops", title: "{{eventTitle}}", link: "{{registerLink}}" },
  {
    ...placeholderEvent,
    id: "evt-4",
    category: "internships",
    title: "{{companyName}} - {{role}} internship",
    organizer: "{{companyName}}",
    date: "{{applicationDeadline}}",
    time: "",
  },
  { ...placeholderEvent, id: "evt-5", category: "internships", title: "{{eventTitle}}", time: "" },
];
