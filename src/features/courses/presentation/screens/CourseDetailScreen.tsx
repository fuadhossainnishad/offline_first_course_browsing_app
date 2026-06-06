import React, { useEffect, useMemo } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

import { useCourseStore } from "../../store/useCourseStore";

export default function CourseDetailScreen() {
    const route = useRoute<any>();
    const { courseId } = route.params;

    const {
        courses,
        toggleEnrollment,
        loadCourses,
    } = useCourseStore();


    useEffect(() => {
        loadCourses();
    }, []);


    const course = useMemo(() => {
        return courses.find(
            (c) => c.course_id === courseId
        );
    }, [courses, courseId]);


    const handleEnroll = () => {
        if (!course) return;

        toggleEnrollment(
            course.course_id,
            !course.is_enrolled
        );
    };


    if (!course) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Course not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>

            <Text style={{ fontSize: 22, fontWeight: "700" }}>
                {course.title}
            </Text>

            <Text style={{ marginTop: 6 }}>
                Instructor: {course.instructor_name}
            </Text>

            <Text>
                {course.instructor_expertise_level}
            </Text>

            <View style={{ marginTop: 12 }}>
                <Text>⭐ Rating: {course.rating}</Text>
                <Text>💰 Price: ${course.price_usd}</Text>
                <Text>⏱ Duration: {course.duration_weeks} weeks</Text>

                <Text>
                    {course.is_premium
                        ? "Premium Course"
                        : "Free Course"}
                </Text>
            </View>

            <View style={{ marginTop: 12 }}>
                <Text style={{ fontWeight: "600" }}>
                    Description
                </Text>
                <Text>{course.description_short}</Text>
            </View>

            <View style={{ marginTop: 12 }}>
                <Text style={{ fontWeight: "600" }}>
                    Tags
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 6,
                    }}
                >
                    {course.tags?.map((tag: string) => (
                        <View
                            key={tag}
                            style={{
                                backgroundColor: "#eee",
                                padding: 6,
                                borderRadius: 6,
                                marginRight: 6,
                                marginTop: 6,
                            }}
                        >
                            <Text>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <Pressable
                onPress={handleEnroll}
                style={{
                    marginTop: 20,
                    backgroundColor: course.is_enrolled
                        ? "#dc2626"
                        : "#16a34a",
                    padding: 14,
                    borderRadius: 8,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontWeight: "600" }}>
                    {course.is_enrolled
                        ? "Remove Enrollment"
                        : "Mark as Enrolled"}
                </Text>
            </Pressable>
        </ScrollView>
    );
}