import React from "react";
import { View, Text } from "react-native";

export default function OfflineBanner() {
  // later you can connect NetInfo
  const isOffline = false;

  if (!isOffline) return null;

  return (
    <View
      style={{
        backgroundColor: "red",
        padding: 8,
      }}
    >
      <Text style={{ color: "white" }}>
        You are offline
      </Text>
    </View>
  );
}