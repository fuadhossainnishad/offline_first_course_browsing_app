import { ScrollView, Text, Pressable } from "react-native";
import { useCourseStore } from "@/features/courses/store/useCourseStore";
import { Filters } from '../features/courses/store/useCourseStore';

const Filter = ["All", "Free", "Premium", "Enrolled"];

export default function FilterChips() {
  const { setFilters, filters } = useCourseStore();

  const active =
    filters.premium === undefined && filters.enrolled === undefined
      ? "All"
      : filters.premium === false
        ? "Free"
        : filters.premium === true
          ? "Premium"
          : "Enrolled";

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {Filter.map((item) => (
        <Pressable
          key={item}
          onPress={() => {
            if (item === "All") {
              setFilters({
                premium: undefined,
                enrolled: undefined,
              });
            }

            if (item === "Free") {
              setFilters({ premium: false });
            }

            if (item === "Premium") {
              setFilters({ premium: true });
            }

            if (item === "Enrolled") {
              setFilters({ enrolled: true });
            }
          }}
          className={`px-4 py-2 mr-2 rounded-full border ${active === item
            ? "bg-indigo-600 border-indigo-600"
            : "bg-white border-gray-200"
            }`}
        >
          <Text className={active === item ? "text-white" : "text-gray-600"}>
            {item}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}