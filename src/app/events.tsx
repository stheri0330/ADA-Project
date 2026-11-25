import { useRouter } from "expo-router";
import UpcomingEvents from "@/pages/UpcomingEvents";

export default function EventsScreen() {
  const router = useRouter();

  return (
    <UpcomingEvents
      onNavigate={(page) => {
        if (page === "home") router.push("/");
        // TODO: add the Q&A screen later, e.g. router.push("/qa")
      }}
    />
  );
}