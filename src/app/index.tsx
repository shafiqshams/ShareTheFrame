import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold text-white">Home</Text>
      <Link href="/camera" className="text-white">Open Camera</Link>
    </View>
  );
}