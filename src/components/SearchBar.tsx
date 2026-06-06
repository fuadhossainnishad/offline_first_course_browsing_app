import { TextInput, View } from "react-native";

export default function SearchBar({
  onChange,
}: {
  onChange: (text: string) => void;
}) {
  return (
    <View className="bg-white border border-gray-200 rounded-2xl px-4 py-3 mb-3 shadow-sm">
      <TextInput
        placeholder="Search courses, instructors..."
        placeholderTextColor="#9CA3AF"
        onChangeText={onChange}
        className="text-gray-900"
      />
    </View>
  );
}