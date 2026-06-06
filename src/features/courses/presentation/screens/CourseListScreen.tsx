import React, { useEffect, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    ActivityIndicator,
    RefreshControl,
} from "react-native";

import { useCourseStore } from "../../store/useCourseStore";
import CourseCard from "../components/CourseCard";
import OfflineBanner from "../components/OfflineBanner";
import CourseFilters from "../components/CourseFilters";

export default function CourseListScreen() {
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

    /**
     * INITIAL LOAD (cached first)
     */
    useEffect(() => {
        loadCourses();
    }, []);

    /**
     * SEARCH (no debounce needed here if repository handles it)
     */
    const handleSearch = useCallback(
        (text: string) => {
            setSearch(text);
            loadCourses();
        },
        []
    );

    /**
     * RENDER ITEM (memo-friendly)
     */
    const renderItem = useCallback(({ item }) => {
        return <CourseCard course={item} />;
    }, []);

    const keyExtractor = useCallback(
        (item: any) => item.course_id,
        []
    );

    /**
     * EMPTY STATE
     */
    if (!loading && courses.length === 0) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>No courses found</Text>
            </View>
        );
    }

    /**
     * ERROR STATE (no blank screen rule)
     */
    if (error) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text style={{ color: "red" }}>
                    {error}
                </Text>
                <Text onPress={loadCourses}>
                    Tap to retry
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">

            {/* OFFLINE BANNER */}
            <OfflineBanner />

            {/* SEARCH */}
            <View className="p-3">
                <TextInput
                    placeholder="Search courses..."
                    onChangeText={handleSearch}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 8,
                    }}
                />
            </View>

            {/* FILTERS + SORT */}
            <CourseFilters />

            {/* LAST SYNC INFO */}
            {lastSynced && (
                <Text className="px-3 text-xs text-gray-500">
                    Last synced: {new Date(lastSynced).toLocaleString()}
                </Text>
            )}

            {/* LIST */}
            <FlatList
                data={courses}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshCourses}
                    />
                }
                removeClippedSubviews
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                updateCellsBatchingPeriod={50}
            />

            {/* LOADING OVERLAY */}
            {loading && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    );
}