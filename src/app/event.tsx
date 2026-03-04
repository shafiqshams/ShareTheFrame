import { AdvancedImage } from "cloudinary-react-native";
import { Text, View } from "react-native";
import { cloudinary } from "../lib/cloudinary";

export default function Event() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold text-white">Event</Text>
      <AdvancedImage 
        cldImg={cloudinary.image('gtzjmtrte3v6xg9zrjks')} 
        className="w-full aspect-[3/4]"/>
    </View>
  );
}