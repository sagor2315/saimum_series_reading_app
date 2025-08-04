// chapter.js

import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { verticalScale } from "react-native-size-matters";
import { getCachedData } from "../utils/dataCache";

export default function Chapter() {
  const { book_json_data, chapter_no } = useLocalSearchParams();
  const [chapter, setChapter] = useState(null);
  const [fontSize, setFontSize] = useState(18);

  //   useEffect(() => {
  //     if (book_json_data && chapter_no) {
  //       fetch(book_json_data)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           const found = data.chapters.find(
  //             (ch) => Number(ch.chapter_no) === Number(chapter_no)
  //           );
  //           setChapter(found);
  //         });
  //     }
  //   }, [book_json_data, chapter_no]);

  useEffect(() => {
    if (book_json_data && chapter_no) {
      const filename = book_json_data.split("/").pop();
      const filePath = FileSystem.documentDirectory + "book_cache/" + filename;
      getCachedData(book_json_data, filePath).then((data) => {
        const found = data.chapters.find(
          (ch) => Number(ch.chapter_no) === Number(chapter_no)
        );
        setChapter(found);
      });
    }
  }, [book_json_data, chapter_no]);

  if (!chapter) return <Text>Loading...</Text>;

  // Font size বাড়ানো
  const increaseFont = () => {
    if (fontSize < 32) {
      setFontSize((prev) => prev + 2);
    }
  };

  // Font size কমানো
  const decreaseFont = () => {
    if (fontSize > 12) {
      setFontSize((prev) => prev - 2);
    }
  };

  return (
    <ScrollView
      style={{ padding: 10, flex: 1 }}
      contentContainerStyle={{ paddingBottom: verticalScale(30) }}
    >
      {/* <View className="justify-center items-center w-40 mx-auto bg-black">
        <View className="flex-row">
          <Text className="text-xl bg-[#7F00FF] text-white w-8 h-8 text-center rounded-full">
            +
          </Text>
          <Text className="text-xl bg-[#7F00FF] text-white w-20 h-8 text-center">
            Font
          </Text>
          <Text className="text-xl bg-[#7F00FF] text-white w-8 h-8 text-center rounded-full">
            -
          </Text>
        </View>
      </View> */}

      <View className="justify-center items-center w-44 mx-auto">
        <View className="flex-row items-center justify-between relative">
          {/* Left button (Plus) */}
          <TouchableOpacity
            onPress={increaseFont}
            style={{ elevation: 8 }}
            className="bg-[#7F00FF] w-12 h-12 rounded-full -mr-3 z-10 items-center justify-center"
          >
            <Ionicons name="add" size={26} color="white" />
          </TouchableOpacity>

          {/* Middle text */}
          <View className="bg-[#7F00FF] w-24 h-10 items-center justify-center z-0">
            <Text className="text-xl text-white">Font</Text>
          </View>

          {/* Right button (Minus) */}
          <TouchableOpacity
            onPress={decreaseFont}
            style={{ elevation: 8 }}
            className="bg-[#7F00FF] w-12 h-12 rounded-full -ml-3 z-10 items-center justify-center"
          >
            <Ionicons name="remove" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Chapter {chapter.chapter_no}
      </Text>
      <Text
        style={{
          fontSize,
          lineHeight: fontSize * 1.5,
          fontFamily: "NotoSerifBengali_400Regular",
        }}
      >
        {chapter.text}
      </Text>
    </ScrollView>
  );
}
