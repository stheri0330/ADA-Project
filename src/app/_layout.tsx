import { Stack } from "expo-router";
import { View } from "react-native";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { colors } from "@/theme";

// Wraps every page: our Header on top, the current page in the middle, our Footer at the bottom.
// To add a page, just make a new file in src/app (e.g. profile.tsx becomes "/profile").
export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />
      <View style={{ flex: 1 }}>
        {/* headerShown: false hides Expo's default top bar, since we have our own Header */}
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
      </View>
      <Footer />
    </View>
  );
}
