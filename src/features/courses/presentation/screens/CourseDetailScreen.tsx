import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { getCourseById } from "@/database/courseDao";
import { useCourseStore } from "@/features/courses/store/useCourseStore";
import { SafeAreaView } from "react-native-safe-area-context";


export default function CourseDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { toggleEnrollment } = useCourseStore();

    const [course, setCourse] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            if (!id) return;

            const courseId = Array.isArray(id) ? id[0] : id;
            const data = await getCourseById(courseId);
            setCourse(data);
        };

        load();
    }, [id]);

    if (!course) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <Text className="text-gray-500">Loading course...</Text>
            </View>
        );
    }

    const isEnrolled = !!course.is_enrolled;

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1 bg-gray-50">
                {/* HEADER CARD */}
                <View className="bg-white px-5 pt-6 pb-5 rounded-b-3xl shadow-sm gap-2">
                    <Text className="text-2xl font-bold text-gray-900">
                        {course.title}
                    </Text>

                    <Text className="text-gray-500 mt-2 leading-5">
                        {course.description_short}
                    </Text>

                    {/* BADGES */}
                    <View className="flex-row flex-wrap gap-2 mt-4">
                        <View className="bg-indigo-100 px-3 py-1 rounded-full">
                            <Text className="text-indigo-600 text-xs font-semibold">
                                ⭐ {course.rating}
                            </Text>
                        </View>

                        <View className="bg-gray-100 px-3 py-1 rounded-full">
                            <Text className="text-gray-700 text-xs">
                                ⏱ {course.duration_weeks} weeks
                            </Text>
                        </View>

                        <View className="bg-green-100 px-3 py-1 rounded-full">
                            <Text className="text-green-700 text-xs">
                                {course.is_premium ? "Premium" : "Free"}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* BODY */}
                <View className="px-5 mt-5">

                    {/* INSTRUCTOR CARD */}
                    <View className="bg-white p-4 rounded-2xl mb-4 shadow-sm">
                        <Text className="text-xs text-gray-400">Instructor</Text>
                        <Text className="text-lg font-semibold text-gray-900 mt-1">
                            {course.instructor_name}
                        </Text>
                        <Text className="text-gray-500 text-sm mt-1">
                            {course.instructor_expertise_level || "Expert Educator"}
                        </Text>
                    </View>

                    {/* DETAILS CARD */}
                    <View className="bg-white p-4 rounded-2xl mb-6 shadow-sm">
                        <Text className="text-sm font-semibold text-gray-800 mb-2">
                            Course Details
                        </Text>

                        <Text className="text-gray-600 text-sm">
                            Duration: {course.duration_weeks} weeks
                        </Text>

                        <Text className="text-gray-600 text-sm mt-1">
                            Rating: {course.rating}/5
                        </Text>

                        <Text className="text-gray-600 text-sm mt-1">
                            Price: ${course.price_usd}
                        </Text>

                        <Text className="text-gray-600 text-sm mt-1">
                            Type: {course.is_premium ? "Premium Course" : "Free Course"}
                        </Text>
                    </View>

                    {/* ENROLL BUTTON */}
                    <TouchableOpacity
                        onPress={async () => {
                            await toggleEnrollment(course.course_id, !isEnrolled);

                            const updated = await getCourseById(course.course_id);
                            setCourse(updated);
                        }}
                        className={`p-4 rounded-2xl shadow-md ${isEnrolled ? "bg-red-500" : "bg-indigo-600"
                            }`}
                    >
                        <Text className="text-white text-center font-bold text-base">
                            {isEnrolled ? "Remove Enrollment" : "Enroll Now"}
                        </Text>
                    </TouchableOpacity>

                    {/* spacing bottom */}
                    <View className="h-10" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}