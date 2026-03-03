import { Link } from "expo-router";
import { View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center gap-4">
      <Link href="/camera" className="text-white">Open Camera</Link>
      <Link href="/event" className="text-white">Open Event</Link>
    </View>
  );
}