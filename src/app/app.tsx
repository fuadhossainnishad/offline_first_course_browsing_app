import React, { useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCourseStore } from "@/features/courses/store/useCourseStore";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import CourseCard from "@/features/courses/presentation/components/CourseCard";
import OfflineBanner from "@/features/courses/presentation/components/OfflineBanner";

export default function AppScreen() {
    const {
        courses,
        loadCourses,
        refreshCourses,
        loading,
        setFilters,
        filters,
    } = useCourseStore();

    // initial load
    useEffect(() => {
        loadCourses();
    }, []);

    // debounce filter reload
    useEffect(() => {
        const t = setTimeout(() => {
            loadCourses();
        }, 250);

        return () => clearTimeout(t);
    }, [filters]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50 px-4 pt-4">

            <Text className="text-2xl font-bold">Course Explorer</Text>
            <Text className="text-sm text-gray-500 mb-4">
                Learn. Build. Upgrade your skills.
            </Text>

            <OfflineBanner />

            {/* SEARCH */}
            <SearchBar
                onChange={(text) =>
                    setFilters({ search: text })
                }
            />

            {/* FILTERS */}
            <FilterChips />

            {/* LIST */}
            <FlatList
                data={courses}
                keyExtractor={(item) => item.course_id}
                renderItem={({ item }) => (
                    <CourseCard course={item} />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refreshCourses}
                    />
                }
            />
        </SafeAreaView>
    );
}