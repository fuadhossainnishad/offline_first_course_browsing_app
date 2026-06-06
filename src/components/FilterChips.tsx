import { ScrollView, Text, Pressable } from "react-native";

const filters = ["All", "Free", "Premium", "Enrolled"];

export default function FilterChips({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
      {filters.map((item) => (
        <Pressable
          key={item}
          onPress={() => onChange(item)}
          className={`px-4 py-2 mr-2 rounded-full border ${
            active === item
              ? "bg-indigo-600 border-indigo-600"
              : "bg-white border-gray-200"
          }`}
        >
          <Text
            className={`text-sm ${
              active === item ? "text-white" : "text-gray-600"
            }`}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}