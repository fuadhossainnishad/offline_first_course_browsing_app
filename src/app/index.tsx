
import { ThemedView } from "@/components/themed-view";

import AppScreen from "./app";
import "./global.css"
import { StyleSheet } from "react-native";


export default function HomeScreen() {

  return (
    // <ThemedView className="flex-1 bg-black"
    //   style={styles.theme}

    // >
    <AppScreen />
    // </ThemedView>
  );
}

const styles = StyleSheet.create({
  theme: {
    backgroundColor: "#000000"
  }
})