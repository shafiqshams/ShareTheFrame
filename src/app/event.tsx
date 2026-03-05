import { artisticFilter } from "@cloudinary/url-gen/actions/effect";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";
import { PixelRatio, Text, useWindowDimensions, View } from "react-native";
import { cloudinary } from "../lib/cloudinary";

export default function Event() {
  
  const { width: windowWidth } = useWindowDimensions();
  const pixelRatio = PixelRatio.get();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold text-white">Event</Text>
      <AdvancedImage 
        cldImg={
          cloudinary.image('dx2t6nymuyymgyaea0hf')
          .resize(
            thumbnail()
              .width(windowWidth * pixelRatio)
              .height(windowWidth * pixelRatio)
          )
          .effect(artisticFilter("zorro"))
        } 
        className="w-full aspect-[3/4]"/>
    </View>
  );
}