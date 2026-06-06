import { ScrollView, Pressable, Text } from "react-native";
import { useCourseStore } from "@/features/courses/store/useCourseStore";

export default function CourseFilters() {
    const { setFilters } = useCourseStore();

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="h-12"
            contentContainerStyle={{
                alignItems: "center",
                paddingHorizontal: 12,
            }}
        >
            <Pressable
                className="px-4 py-2 mr-2 rounded-full bg-gray-100"
                onPress={() =>
                    setFilters({
                        premium: undefined,
                        enrolled: undefined,
                    })
                }
            >
                <Text>All</Text>
            </Pressable>

            <Pressable
                className="px-4 py-2 bg-gray-100 rounded-full"
                onPress={() => setFilters({ premium: false })}
            >
                <Text>Free</Text>
            </Pressable>

            <Pressable
                className="px-4 py-2 mr-2 rounded-full bg-gray-100"
                onPress={() => setFilters({ premium: true })}
            >
                <Text>Premium</Text>
            </Pressable>

            <Pressable
                className="px-4 py-2 mr-2 rounded-full bg-gray-100"
                onPress={() => setFilters({ enrolled: true })}
            >
                <Text>Enrolled</Text>
            </Pressable>

            <Pressable
                className="px-4 py-2 mr-2 rounded-full bg-gray-100"
                onPress={() => setFilters({ sortBy: "rating" })}
            >
                <Text>Rating</Text>
            </Pressable>
        </ScrollView>
    );
}