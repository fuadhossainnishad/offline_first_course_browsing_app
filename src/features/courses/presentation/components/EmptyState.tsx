import React from "react";
import { View, Text } from "react-native";

type Props = {
    title?: string;
    subtitle?: string;
    onRetry?: () => void;
};

export default function EmptyState({
    title = "No courses found",
    subtitle = "Try adjusting your filters or search",
    onRetry,
}: Props) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {title}
            </Text>

            <Text
                style={{
                    marginTop: 8,
                    color: "gray",
                    textAlign: "center",
                }}
            >
                {subtitle}
            </Text>

            {onRetry && (
                <Text
                    onPress={onRetry}
                    style={{
                        marginTop: 12,
                        color: "blue",
                    }}
                >
                    Tap to retry
                </Text>
            )}
        </View>
    );
}