import React from "react";
import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

export type TCourse = {
    course_id: string;
    title: string;
    instructor_name: string;
    duration_weeks: number;
    rating: number;
    price_usd: number;
    is_premium: boolean;
    is_enrolled?: boolean;
};

export default function CourseCard({
    course,
}: {
    course: TCourse;
}) {
    const router = useRouter();
    return (
        <Pressable
            onPress={() => router.push({
                pathname: "/course/[id]",
                params: { id: course.course_id },
            })}
            className="bg-white rounded-2xl border border-gray-100 p-4 mb-3 active:scale-[0.98]"
        >
            {/* HEADER */}
            <View className="flex-row justify-between items-start" >
                <View className="flex-1 pr-3">
                    <Text className="text-lg font-bold text-gray-900" numberOfLines={2}>
                        {course.title}
                    </Text>

                    <Text className="text-sm text-gray-500 mt-1">
                        {course.instructor_name}
                    </Text>
                </View>

                {/* PRICE / BADGE */}
                <View className="items-end">
                    <Text className="text-sm font-semibold text-indigo-600">
                        ${course.price_usd}
                    </Text>

                    {course.is_premium && (
                        <View className="mt-1 bg-amber-100 px-2 py-1 rounded-full">
                            <Text className="text-xs text-amber-700">Premium</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* META */}
            <View className="flex-row justify-between mt-4" >
                <Text className="text-xs text-gray-500">
                    ⏱ {course.duration_weeks} weeks
                </Text>

                <Text className="text-xs text-gray-500">
                    ⭐ {course.rating}
                </Text>

                {
                    course.is_enrolled && (
                        <View className="bg-green-100 px-2 py-1 rounded-full">
                            <Text className="text-xs text-green-700">Enrolled</Text>
                        </View>
                    )
                }
            </View>
        </Pressable >
    );
}