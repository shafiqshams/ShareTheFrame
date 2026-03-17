import { Link } from "expo-router";
import { View } from "react-native";
import { useAuth } from "../providers/AuthProvider";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  console.log({ user, isAuthenticated });
  return (
    <View className="flex-1 justify-center items-center gap-4">
      <Link href="/camera" className="text-white">
        Open Camera
      </Link>
      <Link href="/event" className="text-white">
        Open Event
      </Link>
    </View>
  );
}
