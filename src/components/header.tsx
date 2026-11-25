import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

// Pages in the nav. Each key is passed to onNavigate when its pill is pressed.
export type PageKey = "home" | "qa" | "events";

const NAV_LINKS: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "qa", label: "Q&A Board" },
  { key: "events", label: "Upcoming Events" },
];

/**
 * Shared header for every screen.
 *
 * Props:
 *   active     - which pill to highlight: "home" | "qa" | "events"
 *   user       - { name, avatarUrl }  (TODO: the signed-in user from your backend)
 *   onNavigate - called with a key from NAV_LINKS, e.g. (key) => router.push(...)
 *   onSearch   - called with the search text every time it changes
 */
type HeaderProps = {
  active: PageKey;
  user?: { name?: string; avatarUrl?: string };
  onNavigate?: (page: PageKey) => void;
  onSearch?: (text: string) => void;
};

export default function Header({ active, user = {}, onNavigate = () => {}, onSearch = () => {} }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.navBar}>
        {NAV_LINKS.map((link) => {
          const isActive = link.key === active;
          return (
            <Pressable
              key={link.key}
              onPress={() => onNavigate(link.key)}
              accessibilityRole="link"
              accessibilityState={{ selected: isActive }}
              style={[styles.pill, isActive && styles.pillActive]}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{link.label}</Text>
            </Pressable>
          );
        })}

        <View style={styles.search}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            onChangeText={(text) => onSearch(text.trim())}
            returnKeyType="search"
            style={styles.searchInput}
            accessibilityLabel="Search"
          />
          <Ionicons name="search" size={18} color="#222" />
        </View>
      </View>

      <View style={styles.brand}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} accessibilityLabel={user.name} />
        ) : (
          <View style={[styles.avatar, styles.avatarEmpty]}>
            <Ionicons name="person" size={30} color="#a9cde0" />
          </View>
        )}
        <Text style={styles.brandName}>Branch Out</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.band,
    borderWidth: 3,
    borderColor: colors.bandEdge,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  },
  navBar: {
    flexGrow: 1,
    flexBasis: 320,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    padding: 6,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  pill: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.pill,
    alignItems: "center",
  },
  pillActive: { backgroundColor: colors.pillActive },
  pillText: { color: colors.pillText, fontSize: 14, fontWeight: "600" },
  pillTextActive: { color: "#111" },
  search: {
    flexGrow: 2,
    minWidth: 160,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingLeft: 14,
    paddingRight: 10,
    minHeight: 40,
  },
  searchInput: { flex: 1, fontSize: 16, color: "#111", paddingVertical: 8 },
  brand: { flexDirection: "row", alignItems: "center", gap: 12, marginLeft: "auto" },
  avatar: { width: 44, height: 44, borderRadius: 6 },
  avatarEmpty: { backgroundColor: "#dbe9f2", alignItems: "center", justifyContent: "flex-end" },
  brandName: { fontSize: 17, fontWeight: "700", color: "#111" },
});
