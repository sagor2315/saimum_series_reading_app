// components/BottomMenu.tsx

import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function BottomMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route) => pathname === route;

  return (
    <View className="flex-row justify-around bg-white py-3 border-t border-gray-200 pb-11">
      {/* Home */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/")}
      >
        <Ionicons
          name="home"
          size={24}
          color={isActive("/") ? "#7F00FF" : "#999"}
        />
        <Text
          className={`text-xs ${isActive("/") ? "text-[#7F00FF]" : "text-gray-500"}`}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Books */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/books_screen")}
      >
        <Ionicons
          name="book"
          size={24}
          color={isActive("/books_screen") ? "#7F00FF" : "#999"}
        />
        <Text
          className={`text-xs ${isActive("/books_screen") ? "text-[#7F00FF]" : "text-gray-500"}`}
        >
          Books
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        className="items-center"
        onPress={() => router.push("/profile")}
      >
        <Ionicons
          name="person"
          size={24}
          color={isActive("/profile") ? "#7F00FF" : "#999"}
        />
        <Text
          className={`text-xs ${isActive("/profile") ? "text-[#7F00FF]" : "text-gray-500"}`}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}
