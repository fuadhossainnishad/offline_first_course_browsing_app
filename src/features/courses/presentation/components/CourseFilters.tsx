import React from "react";
import { View, Button } from "react-native";
import { useCourseStore } from "../../store/useCourseStore";

export default function CourseFilters() {
    const {
        setPremium,
        setEnrolled,
        setSortBy,
    } = useCourseStore();

    return (
        <View style={{ flexDirection: "row", gap: 10, padding: 10 }}>
            <Button title="Free" onPress={() => setPremium(false)} />
            <Button title="Premium" onPress={() => setPremium(true)} />
            <Button title="Enrolled" onPress={() => setEnrolled(true)} />
            <Button title="Rating" onPress={() => setSortBy("rating")} />
        </View>
    );
}