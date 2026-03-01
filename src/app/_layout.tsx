import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import '../../global.css';

export default function RootLayout() {
    return (
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Events" }} />
        </Stack>  
      </ThemeProvider>
    )
}