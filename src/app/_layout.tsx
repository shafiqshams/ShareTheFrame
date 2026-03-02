import { Ionicons } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Events" }} />
        <Stack.Screen name="camera" options={{
            title: "Camera",
            headerBackButtonDisplayMode: "minimal",
            headerRight: () => (
              <Link href="/">
                <Ionicons name="share-outline" size={24} color="white" />
              </Link>
            ),
          }}/>
      </Stack>
    </ThemeProvider>
  );
}