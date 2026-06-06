import React, { useEffect } from "react";
import { TextInput, FlatList, View, Text, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

import { useCourseStore } from "@/features/courses/store/useCourseStore";
import CourseCard from "@/features/courses/presentation/components/CourseCard";
import EmptyState from "@/features/courses/presentation/components/EmptyState";

export default function HomeScreen() {
  const {
    courses,
    loading,
    refreshing,
    error,
    lastSynced,
    loadCourses,
    refreshCourses,
    setSearch,
  } = useCourseStore();

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    loadCourses();
  };

  return (
    <ThemedView className="flex-1 bg-white">
      <SafeAreaView className="flex-1 px-4">

        {/* HEADER */}
        <View className="mb-3">
          <Text className="text-2xl font-bold">
            Course Explorer
          </Text>

          {lastSynced && (
            <Text className="text-xs text-gray-500">
              Last synced:{" "}
              {new Date(lastSynced).toLocaleString()}
            </Text>
          )}
        </View>

        {/* SEARCH */}
        <TextInput
          placeholder="Search courses..."
          onChangeText={handleSearch}
          className="border border-gray-300 px-3 py-2 rounded-lg mb-3"
        />

        {/* ERROR STATE */}
        {error && (
          <View className="mb-2">
            <Text className="text-red-500">{error}</Text>
            <Text
              onPress={loadCourses}
              className="text-blue-500 mt-1"
            >
              Retry
            </Text>
          </View>
        )}

        {/* LIST */}
        <FlatList
          data={courses}
          keyExtractor={(item) => item.course_id}
          renderItem={({ item }) => (
            <CourseCard course={item} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshCourses}
            />
          }
          ListEmptyComponent={
            !loading && (
              <EmptyState
                title="No courses found"
                subtitle="Try adjusting search or filters"
              />
            )
          }
        />

        {/* LOADING OVERLAY */}
        {loading && courses.length === 0 && (
          <View className="absolute inset-0 flex items-center justify-center bg-white/70">
            <Text className="text-gray-600">
              Loading courses...
            </Text>
          </View>
        )}

      </SafeAreaView>
    </ThemedView>
  );
}