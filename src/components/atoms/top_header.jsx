// // components/Header.tsx
// import { StatusBar } from "expo-status-bar";
// import { Text, View } from "react-native";
// import { verticalScale } from "react-native-size-matters";

// export default function TopHeader() {
//   return (
//     <>
//       <StatusBar
//         style="light" // Make icons white
//         backgroundColor="#7F00FF" // Match your header bg
//         translucent={false} // Prevent content overlap
//       />
//       <View
//         className="bg-[#7F00FF] justify-end items-center"
//         style={{
//           height: verticalScale(80),
//           elevation: 4,
//           borderBottomLeftRadius: 5,
//           borderBottomRightRadius: 5,
//         }}
//       >
//         <Text
//           className="text-white text-xl font-bold"
//           style={{ paddingBottom: verticalScale(12) }}
//         >
//           সাইমুম সিরিজ
//         </Text>
//       </View>
//     </>

//   );
// }

// components/Header.tsx
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { verticalScale } from "react-native-size-matters";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // index page হলে back button দেখানো লাগবে না
  const showBack = pathname !== "/";

  return (
    <>
      <StatusBar style="light" backgroundColor="#7F00FF" translucent={false} />

      <View
        className="bg-[#7F00FF] flex-row items-end justify-center gap-5 pb-3"
        style={{ height: verticalScale(80) }}
      >
        {showBack && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Text
          className="text-white text-xl font-bold"
          style={{ fontFamily: "NotoSerifBengali_400Regular" }}
        >
          সাইমুম সিরিজ
        </Text>
      </View>
    </>
  );
}
