import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";

import { useCourseStore } from "@/features/courses/store/useCourseStore";
import FilterChips from "@/components/FilterChips";
import SearchBar from "@/components/SearchBar";
import CourseCard from "@/features/courses/presentation/components/CourseCard";
import { SafeAreaView } from "react-native-safe-area-context";
import testSupabase from "@/test/testSupabase";

export default function AppScreen() {
    const {
        courses,
        loadCourses,
        refreshCourses,
        setSearch,
        loading,
    } = useCourseStore();

    const [filter, setFilter] = useState("All");

    useEffect(() => {
        loadCourses();
        testSupabase();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-50 px-4 pt-4">

            {/* HEADER */}
            <Text className="text-2xl font-bold text-gray-900">
                Course Explorer
            </Text>

            <Text className="text-sm text-gray-500 mb-4">
                Learn. Build. Upgrade your skills.
            </Text>

            {/* SEARCH */}
            <SearchBar
                onChange={(t) => {
                    setSearch(t);
                    loadCourses();
                }}
            />

            {/* FILTERS */}
            <FilterChips active={filter} onChange={setFilter} />

            {/* LIST */}
            <FlatList
                data={courses}
                keyExtractor={(item) => item.course_id}
                renderItem={({ item }) => (
                    <CourseCard course={item} />
                )}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refreshCourses} />
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}