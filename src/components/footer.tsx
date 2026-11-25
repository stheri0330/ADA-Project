import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/theme";

// TODO: replace the "#" URLs with the real profile links.
const SOCIAL_LINKS: { label: string; icon: string; url: string }[] = [
  { label: "X", icon: "x-twitter", url: "#" },
  { label: "Instagram", icon: "instagram", url: "#" },
  { label: "YouTube", icon: "youtube", url: "#" },
  { label: "LinkedIn", icon: "linkedin", url: "#" },
];

const CONTACT_EMAIL = "info@branchout.com";

// Opens a link, but skips the "#" placeholders so nothing breaks during development.
function openLink(url: string) {
  if (url && url !== "#") Linking.openURL(url);
}

/** Shared footer for every screen. */
export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.socials}>
        {SOCIAL_LINKS.map((s) => (
          <Pressable
            key={s.label}
            onPress={() => openLink(s.url)}
            accessibilityRole="link"
            accessibilityLabel={s.label}
            style={styles.iconButton}
          >
            {/* "brand" tells FontAwesome6 to use its brand-logo font */}
            <FontAwesome6 name={s.icon} size={22} color={colors.white} brand />
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => openLink(`mailto:${CONTACT_EMAIL}`)}
        accessibilityRole="link"
        style={styles.contactPill}
      >
        <Text style={styles.contactText}>Contact Us: {CONTACT_EMAIL}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.band,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  socials: { flexDirection: "row", gap: 4 },
  iconButton: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  contactPill: {
    flexGrow: 1,
    maxWidth: 340,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.55)",
    alignItems: "center",
  },
  contactText: { color: "#0d2a7a", fontWeight: "700", fontSize: 14 },
});
