import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { CATEGORIES, EventItem, mockEvents } from "@/data/mockEvents";
import { colors } from "@/theme";

/**
 * Upcoming Events page ("/events").
 * The header and footer come from _layout.tsx, so this file is only the page content.
 */
export default function UpcomingEvents() {
  // TODO: replace mockEvents with data from your backend.
  const events = mockEvents;

  // The header's search box puts its text in the address as ?q=...
  const { q: query = "" } = useLocalSearchParams<{ q?: string }>();
  const searchQuery = String(query);

  const q = searchQuery.toLowerCase();
  const matches = (ev: EventItem) => !q || `${ev.title} ${ev.organizer}`.toLowerCase().includes(q);
  const visible = events.filter(matches);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Upcoming Events</Text>

        {CATEGORIES.map((cat) => {
          const total = events.filter((ev) => ev.category === cat.key).length;
          const shown = visible.filter((ev) => ev.category === cat.key);
          if (q && shown.length === 0) return null; // hide empty sections while searching

          return (
            <EventSection
              key={cat.key}
              label={cat.label}
              count={total}
              startOpen={cat.startOpen}
              forceOpen={q !== ""}
              events={shown}
            />
          );
        })}

        {q !== "" && visible.length === 0 && (
          <Text style={styles.muted}>No events match “{searchQuery}”.</Text>
        )}
    </ScrollView>
  );
}

/** One collapsible category: Clubs, Workshops, Internships. */
type EventSectionProps = {
  label: string;
  count: number;
  startOpen: boolean;
  forceOpen: boolean;
  events: EventItem[];
};

function EventSection({ label, count, startOpen, forceOpen, events }: EventSectionProps) {
  const [open, setOpen] = useState(startOpen);
  const isOpen = open || forceOpen; // searching opens every section with matches

  return (
    <View style={styles.section}>
      <Pressable
        onPress={() => setOpen(!open)}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        style={styles.sectionHead}
      >
        <Ionicons name={isOpen ? "caret-down" : "caret-forward"} size={14} color={colors.text} />
        <Text style={styles.sectionTitle}>{label}</Text>
        <Text style={styles.muted}>({count})</Text>
      </Pressable>

      {isOpen && (
        <View style={styles.cardList}>
          {events.length === 0 ? (
            <Text style={[styles.muted, styles.empty]}>No upcoming events yet.</Text>
          ) : (
            events.map((ev, i) => (
              // Match the mockup: the first Clubs card starts open.
              <EventCard key={ev.id} event={ev} startOpen={ev.category === "clubs" && i === 0} />
            ))
          )}
        </View>
      )}
    </View>
  );
}

/** One expandable event card. */
function EventCard({ event, startOpen }: { event: EventItem; startOpen: boolean }) {
  const [open, setOpen] = useState(startOpen);

  const rows = [
    ["Organizer", event.organizer],
    ["Date", event.date],
    ["Time", event.time],
    ["Location", event.location],
  ].filter(([, value]) => value !== ""); // skip empty fields (e.g. internships have no time)

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => setOpen(!open)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={styles.cardHead}
      >
        <Ionicons name={open ? "caret-down" : "caret-forward"} size={12} color={colors.text} />
        <Text style={styles.cardTitle}>
          <WithPlaceholders text={event.title} />
        </Text>
      </Pressable>

      {open && (
        <View style={styles.cardBody}>
          {rows.map(([label, value]) => (
            <View key={label} style={styles.metaRow}>
              <Text style={[styles.muted, styles.metaLabel]}>{label}</Text>
              <Text style={styles.metaValue}>
                <WithPlaceholders text={value} />
              </Text>
            </View>
          ))}

          <Text style={styles.body}>
            <WithPlaceholders text={event.description} />
          </Text>

          {/* TODO: open event.link with Linking.openURL once links are real URLs */}
          <Pressable accessibilityRole="button" style={styles.button}>
            <Text style={styles.buttonText}>
              {event.category === "workshops" ? "Register" : "Learn more"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

/**
 * Shows text, highlighting each {{placeholder}} in yellow.
 * Must be used inside a <Text>. Once real data arrives nothing matches,
 * so the text just shows normally.
 */
function WithPlaceholders({ text }: { text: string }) {
  const parts = String(text).split(/(\{\{\w+\}\})/).filter(Boolean);
  const pieces = parts.map((part, i) =>
    /^\{\{\w+\}\}$/.test(part) ? (
      <Text key={i} style={styles.placeholder}>{part}</Text>
    ) : (
      part
    )
  );
  return <>{pieces}</>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 40, width: "100%", maxWidth: 1100, alignSelf: "center" },
  title: { fontSize: 28, fontWeight: "700", color: colors.text, marginBottom: 12 },
  muted: { color: colors.muted, fontSize: 14 },

  section: { marginBottom: 10 },
  sectionHead: { flexDirection: "row", alignItems: "center", gap: 8, minHeight: 44 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: colors.text },

  cardList: { gap: 10 },
  empty: { marginLeft: 22, fontStyle: "italic" },

  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
  },
  cardHead: { flexDirection: "row", alignItems: "center", gap: 8, padding: 12, minHeight: 44 },
  cardTitle: { flex: 1, fontSize: 15, fontWeight: "700", color: colors.text },
  cardBody: { paddingHorizontal: 16, paddingBottom: 16, paddingLeft: 32, gap: 8 },

  metaRow: { flexDirection: "row", gap: 12 },
  metaLabel: { width: 80 },
  metaValue: { flex: 1, fontSize: 15, color: colors.text },
  body: { fontSize: 15, color: colors.text },

  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.band,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    marginTop: 4,
  },
  buttonText: { color: colors.white, fontWeight: "600" },

  placeholder: {
    backgroundColor: colors.placeholderBg,
    color: colors.placeholderText,
    fontFamily: "monospace",
  },
});
